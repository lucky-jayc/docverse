import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setAuthModalOpen, login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
      signup(email || 'user@example.com', name || 'New User');
    } else {
      login(email || 'user@example.com', name || 'User');
    }
  };

  const demoLogin = (plan: 'free' | 'premium' | 'business') => {
    login(`${plan}.user@example.com`, `${plan.toUpperCase()} Demo User`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 border border-gray-200 dark:border-slate-800 shadow-2xl relative animate-in zoom-in-95 duration-150">
        
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center pb-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Access your PDF workspace and history across devices
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
          >
            {mode === 'login' ? 'Log In to Account' : 'Create Free Account'}
          </button>
        </form>

        {/* Google Sign In Option */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800 text-center">
          <button
            onClick={() => demoLogin('free')}
            className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 flex items-center justify-center space-x-2"
          >
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Quick Demo Logins for Testing */}
        <div className="mt-4 p-3 rounded-2xl bg-emerald-50/60 dark:bg-slate-800/60 border border-emerald-100 dark:border-slate-700/60">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 text-center">
            Instant Test Demo Accounts
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => demoLogin('free')}
              className="py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-[11px] font-bold text-amber-700 hover:bg-amber-50"
            >
              Free User
            </button>
            <button
              onClick={() => demoLogin('premium')}
              className="py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-500"
            >
              Pro Member
            </button>
            <button
              onClick={() => demoLogin('business')}
              className="py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-bold hover:bg-slate-800"
            >
              Business
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            {mode === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
          </button>
        </div>

      </div>
    </div>
  );
};
