import React, { useState } from 'react';
import { 
  FileText, 
  Crown, 
  Sun, 
  Moon, 
  Laptop, 
  Menu, 
  X, 
  ChevronDown, 
  User as UserIcon, 
  LogOut, 
  ShieldAlert, 
  Sparkles,
  LayoutDashboard,
  CreditCard,
  HelpCircle,
  BookOpen,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { TOOLS_DATA } from '../data/toolsData';
import { ToolId } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectTool: (toolId: ToolId) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onSelectTool }) => {
  const { theme, setTheme, effectiveTheme } = useTheme();
  const { user, isAuthenticated, setAuthModalOpen, setUpgradeModalOpen, logout } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isFree = user?.plan === 'free';
  const remainingOps = isFree ? Math.max(0, (user?.maxDailyUsage || 10) - (user?.dailyUsageCount || 0)) : 'Unlimited';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Doc<span className="text-emerald-600 dark:text-emerald-400">Verse</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-medium">
              SaaS
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-6">
          
          {/* PDF Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              onMouseEnter={() => setToolsDropdownOpen(true)}
              className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 rounded-lg transition-colors"
            >
              <span>PDF Tools</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsDropdownOpen && (
              <div 
                className="absolute top-full left-0 w-80 mt-1 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 py-2">
                  All 12 Features
                </div>
                <div className="grid grid-cols-1 gap-1 max-h-96 overflow-y-auto custom-scrollbar">
                  {TOOLS_DATA.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        onSelectTool(tool.id);
                        setActiveTab('home');
                        setToolsDropdownOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/60 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center justify-between">
                          <span className="truncate">{tool.name}</span>
                          {tool.badge && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                              {tool.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{tool.shortDesc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors flex items-center space-x-1.5 ${
              activeTab === 'dashboard' 
                ? 'text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40' 
                : 'text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors flex items-center space-x-1.5 ${
              activeTab === 'pricing' 
                ? 'text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40' 
                : 'text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab('blog')}
            className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors flex items-center space-x-1.5 ${
              activeTab === 'blog' 
                ? 'text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40' 
                : 'text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Blog</span>
          </button>

          <button
            onClick={() => setActiveTab('help')}
            className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors flex items-center space-x-1.5 ${
              activeTab === 'help' 
                ? 'text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40' 
                : 'text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors flex items-center space-x-1.5 ${
              activeTab === 'admin' 
                ? 'text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40' 
                : 'text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Admin</span>
          </button>

        </nav>

        {/* Right Actions: Theme Toggle, Quota Indicator, User Menu */}
        <div className="flex items-center space-x-3">
          
          {/* Quota Meter Badge */}
          {isAuthenticated && (
            <div 
              onClick={() => isFree && setUpgradeModalOpen(true)}
              className={`hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition-transform hover:scale-105 ${
                isFree 
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300' 
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              }`}
            >
              {isFree ? (
                <>
                  <Crown className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  <span>Free: {remainingOps} ops left</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="uppercase tracking-wider font-bold">{user?.plan}</span>
                </>
              )}
            </div>
          )}

          {/* Theme Switcher Button */}
          <div className="relative">
            <button
              onClick={() => {
                if (theme === 'light') setTheme('dark');
                else if (theme === 'dark') setTheme('system');
                else setTheme('light');
              }}
              title={`Current Theme: ${theme.toUpperCase()}`}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              {effectiveTheme === 'dark' ? (
                <Moon className="w-5 h-5 text-indigo-400" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
            </button>
          </div>

          {/* User Auth Buttons or Profile Menu */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-full border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  {user?.name.charAt(0) || 'U'}
                </div>
                <span className="hidden sm:inline-block text-xs font-semibold text-gray-800 dark:text-gray-200 pr-1 max-w-[100px] truncate">
                  {user?.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 hidden sm:inline-block" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-2 z-50">
                  <div className="px-3 py-2 border-b border-gray-100 dark:border-slate-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('dashboard');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700/60 rounded-xl transition-colors flex items-center space-x-2 mt-1"
                  >
                    <UserIcon className="w-4 h-4 text-gray-500" />
                    <span>My Account</span>
                  </button>

                  <button
                    onClick={() => {
                      setUpgradeModalOpen(true);
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl transition-colors flex items-center space-x-2"
                  >
                    <Crown className="w-4 h-4" />
                    <span>Upgrade Plan</span>
                  </button>

                  <div className="border-t border-gray-100 dark:border-slate-700 my-1"></div>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAuthModalOpen(true)}
                className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 rounded-xl transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => setAuthModalOpen(true)}
                className="text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-xl shadow-md shadow-emerald-600/20 transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Navigation
          </div>
          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className="w-full text-left font-medium text-gray-800 dark:text-gray-200 py-2 border-b border-gray-100 dark:border-slate-800"
          >
            Home / PDF Tools
          </button>
          <button
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-left font-medium text-gray-800 dark:text-gray-200 py-2 border-b border-gray-100 dark:border-slate-800"
          >
            Dashboard
          </button>
          <button
            onClick={() => { setActiveTab('pricing'); setMobileMenuOpen(false); }}
            className="w-full text-left font-medium text-gray-800 dark:text-gray-200 py-2 border-b border-gray-100 dark:border-slate-800"
          >
            Pricing & Plans
          </button>
          <button
            onClick={() => { setActiveTab('blog'); setMobileMenuOpen(false); }}
            className="w-full text-left font-medium text-gray-800 dark:text-gray-200 py-2 border-b border-gray-100 dark:border-slate-800"
          >
            Blog
          </button>
          <button
            onClick={() => { setActiveTab('help'); setMobileMenuOpen(false); }}
            className="w-full text-left font-medium text-gray-800 dark:text-gray-200 py-2 border-b border-gray-100 dark:border-slate-800"
          >
            Help Center
          </button>
          <button
            onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
            className="w-full text-left font-medium text-gray-800 dark:text-gray-200 py-2 border-b border-gray-100 dark:border-slate-800"
          >
            Admin Panel
          </button>

          {!isAuthenticated && (
            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-2.5 text-center font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl"
              >
                Log In
              </button>
              <button
                onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-2.5 text-center font-semibold text-white bg-emerald-600 rounded-xl"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
