import React from 'react';
import { Crown, Check, X, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const UpgradeModal: React.FC<{ onNavigatePricing: () => void }> = ({ onNavigatePricing }) => {
  const { isUpgradeModalOpen, setUpgradeModalOpen } = useAuth();

  if (!isUpgradeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 border border-gray-200 dark:border-slate-800 shadow-2xl relative text-center animate-in zoom-in-95 duration-150">
        
        <button
          onClick={() => setUpgradeModalOpen(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 flex items-center justify-center mb-4">
          <Crown className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          Daily Free Limit Reached!
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          You've used all 10 free daily operations. Upgrade to Pro for unlimited access and batch processing.
        </p>

        <ul className="mt-6 space-y-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 text-left bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl">
          <li className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Unlimited PDF operations</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Ad-free distraction-free workspace</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>500 MB file upload limit</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Gemini AI OCR text extraction</span>
          </li>
        </ul>

        <button
          onClick={() => {
            setUpgradeModalOpen(false);
            onNavigatePricing();
          }}
          className="w-full mt-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105 flex items-center justify-center space-x-2"
        >
          <span>Upgrade to Pro ($4.50/mo)</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
