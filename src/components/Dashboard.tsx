import React from 'react';
import { 
  Crown, 
  Clock, 
  Star, 
  Zap, 
  FileCheck, 
  Download, 
  TrendingUp, 
  HardDrive, 
  Trash2, 
  ArrowRight,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TOOLS_DATA } from '../data/toolsData';
import { ToolId } from '../types';

interface DashboardProps {
  onSelectTool: (toolId: ToolId) => void;
  onNavigatePricing: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectTool, onNavigatePricing }) => {
  const { user, activityLogs, setUpgradeModalOpen, clearHistory } = useAuth();

  const isFree = user?.plan === 'free';
  const usagePercentage = user ? Math.min(100, (user.dailyUsageCount / user.maxDailyUsage) * 100) : 0;

  const favoriteTools = TOOLS_DATA.filter((t) => user?.favorites.includes(t.id));

  // Compute total processed size
  const totalMbProcessed = activityLogs.reduce((acc, log) => acc + (log.fileSize || 0), 0) / (1024 * 1024);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-8 sm:p-10 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Workspace Active</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Friend'}!
            </h1>
            <p className="mt-2 text-sm text-gray-300 max-w-xl">
              Manage your recent PDF operations, review activity history, and jump right into your favorite tools.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            {isFree && (
              <button
                onClick={() => setUpgradeModalOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105 flex items-center space-x-2"
              >
                <Crown className="w-4 h-4 fill-slate-950" />
                <span>Upgrade to Pro</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats & Quota Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Daily Quota Usage */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Daily Operation Usage
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isFree ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {isFree ? 'FREE TIER' : 'UNLIMITED'}
            </span>
          </div>

          <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {user?.dailyUsageCount} / {user?.maxDailyUsage === 999999 ? '∞' : user?.maxDailyUsage} <span className="text-sm font-normal text-gray-500">ops today</span>
          </div>

          {isFree && (
            <div className="mt-3">
              <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all"
                  style={{ width: `${usagePercentage}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Resets every 24 hours. Need unlimited? <button onClick={onNavigatePricing} className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Upgrade</button>
              </p>
            </div>
          )}
        </div>

        {/* Card 2: Total Activity Count */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Completed Tasks
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {activityLogs.length} Documents
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Successfully processed this session
            </p>
          </div>
        </div>

        {/* Card 3: Storage processed */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Data Processed
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {totalMbProcessed.toFixed(1)} MB
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Zero server persistence — files deleted locally
            </p>
          </div>
        </div>

      </div>

      {/* Favorite Tools Quick Launch Grid */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span>Favorite Tools ({favoriteTools.length})</span>
        </h2>

        {favoriteTools.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No favorite tools added yet. Click the star icon on any tool card on the home page to add it here.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favoriteTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/60 border border-gray-200/80 dark:border-slate-700 hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-600">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                    {tool.shortDesc}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Processing History */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span>Processing History</span>
          </h2>

          {activityLogs.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-xs font-semibold text-rose-600 hover:underline flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {activityLogs.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            No recent activity yet. Process a PDF to see your log here!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700 dark:text-gray-200">
              <thead className="text-xs uppercase bg-gray-50 dark:bg-slate-900/80 text-gray-400 dark:text-gray-500 font-semibold border-b border-gray-100 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3">Tool</th>
                  <th className="px-4 py-3">File Name</th>
                  <th className="px-4 py-3">Original Size</th>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {activityLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/40 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-gray-900 dark:text-white">
                      {log.toolName}
                    </td>
                    <td className="px-4 py-3.5 max-w-xs truncate font-medium text-gray-800 dark:text-gray-200">
                      {log.fileName}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-500">
                      {(log.fileSize / (1024 * 1024)).toFixed(2)} MB
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-400">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <CheckCircle className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
