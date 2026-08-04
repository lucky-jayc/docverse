import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityLog, PlanType, ToolId, UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  activityLogs: ActivityLog[];
  isAuthModalOpen: boolean;
  isUpgradeModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  setUpgradeModalOpen: (open: boolean) => void;
  login: (email: string, name: string) => void;
  signup: (email: string, name: string) => void;
  logout: () => void;
  upgradePlan: (plan: PlanType) => void;
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
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('pdf_toolkit_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEFAULT_USER;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('pdf_toolkit_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_LOGS;
  });

  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);

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

  const login = (email: string, name: string) => {
    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name: name || 'User',
      email,
      plan: 'free',
      dailyUsageCount: 0,
      maxDailyUsage: 10,
      favorites: ['merge', 'compress'],
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    setAuthModalOpen(false);
  };

  const signup = (email: string, name: string) => {
    login(email, name);
  };

  const logout = () => {
    setUser(null);
  };

  const upgradePlan = (plan: PlanType) => {
    if (!user) return;
    const maxDailyUsage = plan === 'free' ? 10 : 999999;
    setUser({
      ...user,
      plan,
      maxDailyUsage,
    });
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
      setUser({
        ...user,
        dailyUsageCount: user.dailyUsageCount + 1,
      });
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

    setUser({
      ...user,
      favorites: updated,
    });
  };

  const clearHistory = () => {
    setActivityLogs([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        activityLogs,
        isAuthModalOpen,
        isUpgradeModalOpen,
        setAuthModalOpen,
        setUpgradeModalOpen,
        login,
        signup,
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
