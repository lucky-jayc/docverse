import React from 'react';
import { ChevronRight, Home, Wrench } from 'lucide-react';
import { ToolId } from '../types';
import { TOOLS_DATA } from '../data/toolsData';

interface BreadcrumbsProps {
  activeTab: string;
  activeToolId: ToolId | null;
  onNavigateHome: () => void;
  onNavigateTab: (tab: string) => void;
  onSelectTool: (toolId: ToolId) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  activeTab,
  activeToolId,
  onNavigateHome,
  onNavigateTab,
  onSelectTool,
}) => {
  if (activeTab === 'home' && !activeToolId) return null;

  const currentTool = activeToolId ? TOOLS_DATA.find((t) => t.id === activeToolId) : null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 my-2">
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 overflow-x-auto whitespace-nowrap scrollbar-none py-1"
      >
        {/* Item 1: Home */}
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="flex items-center">
          <button
            onClick={onNavigateHome}
            itemProp="item"
            className="flex items-center space-x-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none"
          >
            <Home className="w-3.5 h-3.5" />
            <span itemProp="name">Home</span>
          </button>
          <meta itemProp="position" content="1" />
        </li>

        {/* Separator */}
        <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />

        {/* Item 2: Tool View or Subpage */}
        {activeToolId && currentTool ? (
          <>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="flex items-center">
              <button
                onClick={onNavigateHome}
                itemProp="item"
                className="flex items-center space-x-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span itemProp="name">PDF Tools</span>
              </button>
              <meta itemProp="position" content="2" />
            </li>

            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />

            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="flex items-center">
              <span itemProp="name" className="text-gray-900 dark:text-white font-bold truncate max-w-xs">
                {currentTool.name}
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </>
        ) : (
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="flex items-center">
            <span itemProp="name" className="text-gray-900 dark:text-white font-bold capitalize">
              {activeTab === 'help' ? 'Help Center' : activeTab}
            </span>
            <meta itemProp="position" content="2" />
          </li>
        )}
      </ol>
    </nav>
  );
};
