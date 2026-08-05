import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const env = (import.meta as any).env || {};

// Firebase configuration loaded from environment variables with safe defaults
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyDrUlqgVYYGboytk_-Aq6KcMhttMz0FBOE",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "docverse-51c4c.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "docverse-51c4c",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "docverse-51c4c.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "811321721575",
  appId: env.VITE_FIREBASE_APP_ID || "1:811321721575:web:3fc5e6fabe5f9baab55842",
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-2DM9F39NND"
};


// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Analytics initialized safely for browser runtime
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics not supported in this runtime environment
  });
}

export { app, firebaseConfig };
export default app;

