import React from 'react';
import { Sparkles, Crown, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdBanner: React.FC = () => {
  const { user, setUpgradeModalOpen } = useAuth();
  const [dismissed, setDismissed] = React.useState(false);

  // Only show ads for free tier users
  if (user?.plan !== 'free' || dismissed) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-emerald-50/50 to-blue-50 dark:from-slate-800/80 dark:via-slate-800 dark:to-slate-800/80 border border-gray-200 dark:border-slate-700/60 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        
        {/* Subtle Ad Badge */}
        <div className="absolute top-2 right-2 flex items-center space-x-1">
          <span className="text-[10px] font-semibold tracking-wider uppercase text-gray-400 dark:text-gray-500 bg-gray-200/60 dark:bg-slate-700/60 px-1.5 py-0.5 rounded">
            Advertisement
          </span>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded transition-colors"
            title="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Sponsor Content */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                Speed up your PDF workflow with Pro Processing
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
              Enjoy zero ads, 500 MB file limits, batch conversions, and AI OCR scanning.
            </p>
          </div>
        </div>

        {/* Upgrade Call To Action */}
        <button
          onClick={() => setUpgradeModalOpen(true)}
          className="shrink-0 flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all hover:scale-105"
        >
          <Crown className="w-4 h-4 fill-slate-950" />
          <span>Remove Ads ($9.99/mo)</span>
        </button>

      </div>
    </div>
  );
};
