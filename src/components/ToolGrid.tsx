import React, { useState } from 'react';
import { 
  Combine, 
  Scissors, 
  Minimize2, 
  Image, 
  FileImage, 
  RotateCw, 
  Trash2, 
  Grid, 
  Stamp, 
  Lock, 
  Unlock, 
  Sparkles,
  Star,
  ArrowRight
} from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';
import { ToolCategory, ToolId, ToolMeta } from '../types';
import { useAuth } from '../context/AuthContext';

interface ToolGridProps {
  searchQuery: string;
  onSelectTool: (toolId: ToolId) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Combine,
  Scissors,
  Minimize2,
  Image,
  FileImage,
  RotateCw,
  Trash2,
  Grid,
  Stamp,
  Lock,
  Unlock,
  Sparkles,
};

export const ToolGrid: React.FC<ToolGridProps> = ({ searchQuery, onSelectTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const { user, toggleFavorite } = useAuth();

  const categories: { id: ToolCategory; label: string }[] = [
    { id: 'all', label: 'All Tools' },
    { id: 'organize', label: 'Organize & Split' },
    { id: 'convert', label: 'Convert' },
    { id: 'security', label: 'Security & Password' },
    { id: 'edit', label: 'Edit & AI OCR' },
  ];

  const filteredTools = TOOLS_DATA.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="tools-section" className="py-12 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tools Cards Grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
              No PDF tools match "{searchQuery}"
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-3 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              View all tools
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => {
              const IconComponent = ICON_MAP[tool.iconName] || Sparkles;
              const isFavorite = user?.favorites.includes(tool.id) || false;

              return (
                <div
                  key={tool.id}
                  onClick={() => onSelectTool(tool.id)}
                  className="group relative bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-gray-200/80 dark:border-slate-700/80 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer"
                >
                  
                  {/* Top Bar inside Card: Icon + Badges + Favorite Star */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <div className="flex items-center space-x-2">
                        {tool.badge && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            tool.badge === 'Popular' 
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' 
                              : tool.badge === 'Premium'
                              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          }`}>
                            {tool.badge}
                          </span>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(tool.id);
                          }}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-amber-400 dark:hover:text-amber-300 transition-colors"
                          title="Add to Favorites"
                        >
                          <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                      {tool.shortDesc}
                    </p>
                  </div>

                  {/* Card Footer CTA */}
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                      <span>Use Tool</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                      Fast Client-Side
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
