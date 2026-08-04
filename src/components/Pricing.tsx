import React, { useState } from 'react';
import { Check, Crown, Zap, ShieldCheck, X, CreditCard, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PlanType } from '../types';

export const Pricing: React.FC = () => {
  const { user, upgradePlan } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedCheckoutPlan, setSelectedCheckoutPlan] = useState<PlanType | null>(null);

  // Simulated Checkout Form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleSimulatedPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCheckoutPlan) return;
    setIsSubmitting(true);
    setTimeout(() => {
      upgradePlan(selectedCheckoutPlan);
      setIsSubmitting(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        setCheckoutSuccess(false);
        setSelectedCheckoutPlan(null);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-4">
          <Crown className="w-3.5 h-3.5" />
          <span>Flexible Plans for Individuals & Teams</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Start for free and upgrade whenever you need unlimited batch processing, larger file limits, and AI OCR features.
        </p>

        {/* Billing Toggle */}
        <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-slate-900 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
              billingCycle === 'yearly'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <span>Annual Billing</span>
            <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-full uppercase">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        
        {/* PLAN 1: FREE */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Starter
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">Free</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              For casual users needing quick individual file conversions.
            </p>

            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">$0</span>
              <span className="text-sm font-medium text-gray-500 ml-2">/ forever</span>
            </div>

            <ul className="mt-8 space-y-3.5 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>10 PDF operations / day</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Maximum 25 MB file size</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Standard web browser engine</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <X className="w-4 h-4 shrink-0 text-gray-300" />
                <span>Advertisements enabled</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <button
              disabled={user?.plan === 'free'}
              onClick={() => upgradePlan('free')}
              className="w-full py-3.5 rounded-2xl bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 font-bold text-sm hover:bg-gray-200 transition-colors"
            >
              {user?.plan === 'free' ? 'Current Active Plan' : 'Downgrade to Free'}
            </button>
          </div>
        </div>

        {/* PLAN 2: PREMIUM (POPULAR) */}
        <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 border-2 border-emerald-500 shadow-xl flex flex-col justify-between transform md:-translate-y-2">
          
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white font-extrabold text-xs px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
            Most Popular Choice
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Professional
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
              Premium
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              For power users, students, and professionals needing daily speed.
            </p>

            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                {billingCycle === 'yearly' ? '$3.60' : '$4.50'}
              </span>
              <span className="text-sm font-medium text-gray-500 ml-2">/ month</span>
            </div>

            <ul className="mt-8 space-y-3.5 text-sm text-gray-700 dark:text-gray-200">
              <li className="flex items-center space-x-3 font-semibold text-emerald-600 dark:text-emerald-400">
                <Check className="w-4 h-4 shrink-0" />
                <span>Unlimited PDF operations</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Ad-Free Experience</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Up to 500 MB uploads</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Batch File Processing</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Gemini AI OCR Text Extraction</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <button
              disabled={user?.plan === 'premium'}
              onClick={() => setSelectedCheckoutPlan('premium')}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
            >
              {user?.plan === 'premium' ? 'Current Active Plan' : 'Upgrade to Premium'}
            </button>
          </div>
        </div>

        {/* PLAN 3: BUSINESS */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Enterprise & Teams
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">Business</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              For corporate teams, legal departments, and shared storage.
            </p>

            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                {billingCycle === 'yearly' ? '$24.99' : '$29.99'}
              </span>
              <span className="text-sm font-medium text-gray-500 ml-2">/ month</span>
            </div>

            <ul className="mt-8 space-y-3.5 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Everything in Premium</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Up to 10 Team Members</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Shared Workspace Storage</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Admin Dashboard & User Management</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <button
              disabled={user?.plan === 'business'}
              onClick={() => setSelectedCheckoutPlan('business')}
              className="w-full py-3.5 rounded-2xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
            >
              {user?.plan === 'business' ? 'Current Active Plan' : 'Get Business Plan'}
            </button>
          </div>
        </div>

      </div>

      {/* CHECKOUT MODAL SIMULATION */}
      {selectedCheckoutPlan && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-gray-200 dark:border-slate-800 shadow-2xl relative animate-in zoom-in-95 duration-150">
            
            <button
              onClick={() => setSelectedCheckoutPlan(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            {checkoutSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Successful!</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Your plan has been upgraded to {selectedCheckoutPlan.toUpperCase()}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSimulatedPayment} className="space-y-4">
                <div className="text-center pb-2">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Upgrade to {selectedCheckoutPlan.toUpperCase()}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Secure 256-bit SSL encrypted checkout
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 •••• •••• 4242"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      Expiry
                    </label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM / YY"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="123"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md mt-4 transition-colors"
                >
                  {isSubmitting ? 'Processing Payment...' : 'Pay & Activate Plan'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
