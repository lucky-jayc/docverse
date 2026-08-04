import React, { useState } from 'react';
import { Sliders, Users, DollarSign, Activity, HardDrive, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [purged, setPurged] = useState(false);

  const mockUsers = [
    { id: 'usr_1', name: 'Alex Rivera', email: 'alex.rivera@example.com', plan: 'Free', ops: 8 },
    { id: 'usr_2', name: 'Sarah Jenkins', email: 'sarah.j@university.edu', plan: 'Premium', ops: 142 },
    { id: 'usr_3', name: 'Michael Vance', email: 'mvance@corporate.com', plan: 'Business', ops: 890 },
    { id: 'usr_4', name: 'Elena Rostova', email: 'elena@designstudio.io', plan: 'Premium', ops: 310 },
  ];

  const handlePurge = () => {
    setPurged(true);
    setTimeout(() => setPurged(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center space-x-3">
            <Sliders className="w-8 h-8 text-emerald-600" />
            <span>Platform Admin Panel</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Real-time analytics, monetization metrics, and system memory cleanup controls
          </p>
        </div>

        <button
          onClick={handlePurge}
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-colors flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Purge Temp Cache Memory</span>
        </button>
      </div>

      {purged && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>System cache and temporary memory buffers purged successfully!</span>
        </div>
      )}

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase">Total Users</span>
            <Users className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900 dark:text-white mt-2">14,290</div>
          <p className="text-xs text-emerald-600 font-semibold mt-1">+12% this month</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase">Monthly Revenue</span>
            <DollarSign className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900 dark:text-white mt-2">$28,450</div>
          <p className="text-xs text-emerald-600 font-semibold mt-1">MRR growth +18%</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase">Active Subscriptions</span>
            <Activity className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900 dark:text-white mt-2">2,180</div>
          <p className="text-xs text-gray-400 mt-1">1,820 Pro / 360 Business</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase">Server Health</span>
            <HardDrive className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">99.98%</div>
          <p className="text-xs text-gray-400 mt-1">Cloud Run Container Healthy</p>
        </div>

      </div>

      {/* User Management Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">User Accounts & Quotas</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 dark:text-gray-200">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-slate-900 text-gray-400 font-semibold border-b border-gray-100 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3">User ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Subscription Tier</th>
                <th className="px-4 py-3">Lifetime Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {mockUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/40">
                  <td className="px-4 py-3.5 font-mono text-xs text-gray-400">{u.id}</td>
                  <td className="px-4 py-3.5 font-bold text-gray-900 dark:text-white">{u.name}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-500">{u.email}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      u.plan === 'Free'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {u.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-bold text-gray-800 dark:text-gray-200">{u.ops}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
