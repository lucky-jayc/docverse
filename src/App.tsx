import React, { useState } from 'react';
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
import { ToolId } from './types';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeToolId, setActiveToolId] = useState<ToolId | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelectTool = (toolId: ToolId) => {
    setActiveToolId(toolId);
    setActiveTab('home');
    // Smooth scroll to processing engine
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleBackToGrid = () => {
    setActiveToolId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors font-sans antialiased">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'home') setActiveToolId(null);
        }}
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
              />
            ) : (
              <ToolGrid
                searchQuery={searchQuery}
                onSelectTool={handleSelectTool}
              />
            )}
          </>
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            onSelectTool={handleSelectTool}
            onNavigatePricing={() => setActiveTab('pricing')}
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
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'home') setActiveToolId(null);
        }}
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
