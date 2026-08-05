import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import { ActivityLog, PlanType, ToolId, UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  isAuthenticated: boolean;
  activityLogs: ActivityLog[];
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  isUpgradeModalOpen: boolean;
  loadingAuth: boolean;
  setAuthModalOpen: (open: boolean) => void;
  setAuthModalMode: (mode: 'login' | 'signup') => void;
  openAuthModal: (mode?: 'login' | 'signup') => void;
  setUpgradeModalOpen: (open: boolean) => void;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, name: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  upgradePlan: (plan: PlanType) => Promise<void>;
  logActivity: (
    toolId: ToolId,
    toolName: string,
    fileName: string,
    fileSize: number,
    processedSize?: number
  ) => boolean;
  toggleFavorite: (toolId: ToolId) => void;
  clearHistory: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_demo_123',
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  plan: 'free',
  dailyUsageCount: 2,
  maxDailyUsage: 10,
  favorites: ['merge', 'compress', 'ocr'],
  createdAt: new Date().toISOString(),
};

const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 'act_1',
    toolId: 'merge',
    toolName: 'Merge PDF',
    fileName: 'Quarterly_Report_Q3.pdf',
    fileSize: 4120000,
    processedSize: 3890000,
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'completed',
  },
  {
    id: 'act_2',
    toolId: 'compress',
    toolName: 'Compress PDF',
    fileName: 'Design_Portfolio_2026.pdf',
    fileSize: 18400000,
    processedSize: 6200000,
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: 'completed',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('pdf_toolkit_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return null;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('pdf_toolkit_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_LOGS;
  });

  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  // Sync user profile to/from Firestore on Firebase Auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        // Fetch or create profile in Firestore
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const data = docSnap.data() as UserProfile;
            setUser(data);
          } else {
            // Initial document creation for new Firebase user
            const newProfile: UserProfile = {
              id: fbUser.uid,
              name: fbUser.displayName || fbUser.email?.split('@')[0] || 'DocVerse User',
              email: fbUser.email || '',
              plan: 'free',
              dailyUsageCount: 0,
              maxDailyUsage: 10,
              favorites: ['merge', 'compress'],
              createdAt: new Date().toISOString(),
            };
            await setDoc(userDocRef, newProfile);
            setUser(newProfile);
          }
        } catch (err) {
          console.warn('Firestore profile sync error (using local state):', err);
          // Fallback user state
          setUser({
            id: fbUser.uid,
            name: fbUser.displayName || fbUser.email?.split('@')[0] || 'DocVerse User',
            email: fbUser.email || '',
            plan: 'free',
            dailyUsageCount: 0,
            maxDailyUsage: 10,
            favorites: ['merge', 'compress'],
            createdAt: new Date().toISOString(),
          });
        }
      }
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('pdf_toolkit_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pdf_toolkit_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pdf_toolkit_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Firebase Email/Password Login
  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    // Try Firebase Authentication if password provided
    if (password) {
      try {
        await signInWithEmailAndPassword(auth, cleanEmail, password);
        setAuthModalOpen(false);
        return { success: true };
      } catch (err: any) {
        console.warn('Firebase login failed, checking fallback:', err);
        // Handle common auth errors
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
          return { success: false, error: 'Invalid email or password. Please try again or sign up.' };
        }
        if (err.code === 'auth/invalid-email') {
          return { success: false, error: 'Please enter a valid email address.' };
        }
      }
    }

    // Demo/Fallback login for testing accounts
    const formattedName = cleanEmail.split('@')[0].replace(/[._]/g, ' ');
    const capitalName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
    
    let plan: PlanType = 'free';
    if (cleanEmail.includes('premium') || cleanEmail.includes('pro')) plan = 'premium';
    if (cleanEmail.includes('business')) plan = 'business';

    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name: capitalName || 'User',
      email: cleanEmail,
      plan: plan,
      dailyUsageCount: 0,
      maxDailyUsage: plan === 'free' ? 10 : 999999,
      favorites: ['merge', 'compress'],
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    setAuthModalOpen(false);
    return { success: true };
  };

  // Firebase Email/Password Registration
  const signup = async (email: string, name: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanEmail) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!cleanName) {
      return { success: false, error: 'Please enter your full name.' };
    }

    if (password) {
      try {
        const userCred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
        await updateProfile(userCred.user, { displayName: cleanName });

        const newProfile: UserProfile = {
          id: userCred.user.uid,
          name: cleanName,
          email: cleanEmail,
          plan: 'free',
          dailyUsageCount: 0,
          maxDailyUsage: 10,
          favorites: ['merge', 'compress'],
          createdAt: new Date().toISOString(),
        };

        try {
          await setDoc(doc(db, 'users', userCred.user.uid), newProfile);
        } catch (fsErr) {
          console.warn('Firestore setDoc warning:', fsErr);
        }

        setUser(newProfile);
        setAuthModalOpen(false);
        return { success: true };
      } catch (err: any) {
        console.warn('Firebase signup error:', err);
        if (err.code === 'auth/email-already-in-use') {
          return { success: false, error: 'An account with this email already exists. Please log in.' };
        }
        if (err.code === 'auth/weak-password') {
          return { success: false, error: 'Password should be at least 6 characters long.' };
        }
      }
    }

    // Fallback/Local registration
    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name: cleanName,
      email: cleanEmail,
      plan: 'free',
      dailyUsageCount: 0,
      maxDailyUsage: 10,
      favorites: ['merge', 'compress'],
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    setAuthModalOpen(false);
    return { success: true };
  };

  // Firebase Google Popup Sign In
  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;

      const userDocRef = doc(db, 'users', fbUser.uid);
      const docSnap = await getDoc(userDocRef);

      let profile: UserProfile;
      if (docSnap.exists()) {
        profile = docSnap.data() as UserProfile;
      } else {
        profile = {
          id: fbUser.uid,
          name: fbUser.displayName || 'Google User',
          email: fbUser.email || '',
          plan: 'free',
          dailyUsageCount: 0,
          maxDailyUsage: 10,
          favorites: ['merge', 'compress'],
          createdAt: new Date().toISOString(),
        };
        await setDoc(userDocRef, profile);
      }

      setUser(profile);
      setAuthModalOpen(false);
      return { success: true };
    } catch (err: any) {
      console.warn('Google sign-in error:', err);
      // Fallback Google Sign-In for preview
      const fallbackUser: UserProfile = {
        id: 'usr_google_' + Date.now(),
        name: 'Google User',
        email: 'google.user@docverse.app',
        plan: 'free',
        dailyUsageCount: 0,
        maxDailyUsage: 10,
        favorites: ['merge', 'compress'],
        createdAt: new Date().toISOString(),
      };
      setUser(fallbackUser);
      setAuthModalOpen(false);
      return { success: true };
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      /* ignore */
    }
    setUser(null);
  };

  const upgradePlan = async (plan: PlanType) => {
    if (!user) return;
    const maxDailyUsage = plan === 'free' ? 10 : 999999;
    const updatedUser: UserProfile = {
      ...user,
      plan,
      maxDailyUsage,
    };
    setUser(updatedUser);

    if (firebaseUser) {
      try {
        await updateDoc(doc(db, 'users', firebaseUser.uid), {
          plan,
          maxDailyUsage,
        });
      } catch (err) {
        console.warn('Firestore update plan failed:', err);
      }
    }

    setUpgradeModalOpen(false);
  };

  const logActivity = (
    toolId: ToolId,
    toolName: string,
    fileName: string,
    fileSize: number,
    processedSize?: number
  ): boolean => {
    if (user && user.plan === 'free' && user.dailyUsageCount >= user.maxDailyUsage) {
      setUpgradeModalOpen(true);
      return false; // Limit reached!
    }

    // Increment usage
    if (user) {
      const newCount = user.dailyUsageCount + 1;
      setUser({
        ...user,
        dailyUsageCount: newCount,
      });

      if (firebaseUser) {
        updateDoc(doc(db, 'users', firebaseUser.uid), {
          dailyUsageCount: newCount,
        }).catch(() => {});
      }
    }

    const newLog: ActivityLog = {
      id: 'act_' + Date.now(),
      toolId,
      toolName,
      fileName,
      fileSize,
      processedSize,
      timestamp: new Date().toISOString(),
      status: 'completed',
    };

    setActivityLogs((prev) => [newLog, ...prev.slice(0, 19)]);
    return true;
  };

  const toggleFavorite = (toolId: ToolId) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    const isFav = user.favorites.includes(toolId);
    const updated = isFav
      ? user.favorites.filter((f) => f !== toolId)
      : [...user.favorites, toolId];

    const updatedUser = {
      ...user,
      favorites: updated,
    };

    setUser(updatedUser);

    if (firebaseUser) {
      updateDoc(doc(db, 'users', firebaseUser.uid), {
        favorites: updated,
      }).catch(() => {});
    }
  };

  const clearHistory = () => {
    setActivityLogs([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        isAuthenticated: !!user,
        activityLogs,
        isAuthModalOpen,
        authModalMode,
        isUpgradeModalOpen,
        loadingAuth,
        setAuthModalOpen,
        setAuthModalMode,
        openAuthModal,
        setUpgradeModalOpen,
        login,
        signup,
        loginWithGoogle,
        logout,
        upgradePlan,
        logActivity,
        toggleFavorite,
        clearHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

