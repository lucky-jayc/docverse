import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ToolId } from '../types';
import { TOOLS_DATA } from '../data/toolsData';
import { TOOL_SEO_DATA } from '../data/seoData';

interface RelatedToolsProps {
  currentToolId: ToolId;
  onSelectTool: (toolId: ToolId) => void;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ currentToolId, onSelectTool }) => {
  const currentSeo = TOOL_SEO_DATA[currentToolId];
  if (!currentSeo || !currentSeo.relatedTools || currentSeo.relatedTools.length === 0) return null;

  const relatedToolsList = currentSeo.relatedTools
    .map((id) => TOOLS_DATA.find((t) => t.id === id))
    .filter(Boolean);

  if (relatedToolsList.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-gray-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <span>Related PDF Tools</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Complementary tools to optimize your document workflow
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedToolsList.map((tool) => {
          if (!tool) return null;
          return (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className="group p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {tool.name}
                  </h3>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    {tool.category}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                  {tool.shortDesc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700/60 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Use {tool.name}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
