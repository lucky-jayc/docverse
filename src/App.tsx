import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ToolGrid } from './components/ToolGrid';
import { ToolProcessor } from './components/ToolProcessor';
import { AdBanner } from './components/AdBanner';
import { Dashboard } from './components/Dashboard';
import { Pricing } from './components/Pricing';
import { Blog } from './components/Blog';
import { HelpCenter } from './components/HelpCenter';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { UpgradeModal } from './components/UpgradeModal';
import { SEOHead } from './components/SEOHead';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ToolFaqSection } from './components/ToolFaqSection';
import { ToolId } from './types';
import { TOOLS_DATA } from './data/toolsData';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeToolId, setActiveToolId] = useState<ToolId | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Synchronize state with URL Hash for deep SEO linking and browser history
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'home') {
        setActiveTab('home');
        setActiveToolId(null);
      } else if (hash.startsWith('tool-')) {
        const toolId = hash.replace('tool-', '') as ToolId;
        const exists = TOOLS_DATA.some((t) => t.id === toolId);
        if (exists) {
          setActiveTab('home');
          setActiveToolId(toolId);
        } else {
          setActiveTab('home');
          setActiveToolId(null);
        }
      } else if (['pricing', 'blog', 'help', 'dashboard', 'admin'].includes(hash)) {
        setActiveTab(hash);
        setActiveToolId(null);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const updateRoute = (tab: string, toolId: ToolId | null) => {
    setActiveTab(tab);
    setActiveToolId(toolId);

    if (toolId) {
      window.location.hash = `tool-${toolId}`;
    } else if (tab === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = tab;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTool = (toolId: ToolId) => {
    updateRoute('home', toolId);
  };

  const handleBackToGrid = () => {
    updateRoute('home', null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors font-sans antialiased">
      
      {/* Dynamic Document Head & JSON-LD Injection */}
      <SEOHead activeTab={activeTab} activeToolId={activeToolId} />

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => updateRoute(tab, null)}
        onSelectTool={handleSelectTool}
      />

      {/* Visual Breadcrumb Navigation */}
      <Breadcrumbs
        activeTab={activeTab}
        activeToolId={activeToolId}
        onNavigateHome={() => updateRoute('home', null)}
        onNavigateTab={(tab) => updateRoute(tab, null)}
        onSelectTool={handleSelectTool}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {!activeToolId && (
              <Hero
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onExploreClick={() => {
                  const el = document.getElementById('tools-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            )}

            {/* Non-Disruptive Ad Banner for Free Users */}
            <AdBanner />

            {/* Active Processing Engine OR Tool Selection Grid */}
            {activeToolId ? (
              <ToolProcessor
                toolId={activeToolId}
                onBackToGrid={handleBackToGrid}
                onSelectTool={handleSelectTool}
              />
            ) : (
              <>
                <ToolGrid
                  searchQuery={searchQuery}
                  onSelectTool={handleSelectTool}
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                  <ToolFaqSection pageTab="home" />
                </div>
              </>
            )}
          </>
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            onSelectTool={handleSelectTool}
            onNavigatePricing={() => updateRoute('pricing', null)}
          />
        )}

        {activeTab === 'pricing' && <Pricing />}

        {activeTab === 'blog' && <Blog />}

        {activeTab === 'help' && <HelpCenter />}

        {activeTab === 'admin' && <AdminPanel />}
      </main>

      {/* Footer */}
      <Footer
        onSelectTool={handleSelectTool}
        setActiveTab={(tab) => updateRoute(tab, null)}
      />

      {/* Auth & Upgrade Modals */}
      <AuthModal />
      <UpgradeModal onNavigatePricing={() => setActiveTab('pricing')} />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
