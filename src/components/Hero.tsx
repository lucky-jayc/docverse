import React from 'react';
import { ShieldCheck, Zap, Lock, Search, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ searchQuery, setSearchQuery, onExploreClick }) => {
  const { setUpgradeModalOpen } = useAuth();

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 bg-gradient-to-b from-emerald-50/60 via-white to-gray-50/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 transition-colors">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-500/10 via-blue-500/5 to-amber-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Next-Gen Web PDF Platform — Instant & Encrypted</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-tight">
          Every PDF Tool You Need — <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 dark:from-emerald-400 dark:via-teal-300 dark:to-blue-400">
            Fast, Secure, and Free
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Merge, split, compress, convert, protect, and edit PDF files online in seconds. Processing happens safely in browser memory with zero file storage.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
          >
            <span>Try Free Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => setUpgradeModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-bold text-base border border-gray-200 dark:border-slate-700 shadow-sm transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
          >
            <span>Upgrade to Premium</span>
          </button>
        </div>

        {/* Instant Tool Search Input */}
        <div className="mt-10 max-w-xl mx-auto relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g. merge, compress, protect, watermark)..."
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-800/90 border border-gray-200 dark:border-slate-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-lg"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Feature Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-200/60 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
          
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-gray-100 dark:border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Lightning Fast</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Client-side rendering speed</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-gray-100 dark:border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">100% Private</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Files never leave memory</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-gray-100 dark:border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Auto Cleanup</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Purged instantly after download</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
