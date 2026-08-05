import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { ToolId } from '../types';
import { TOOL_SEO_DATA, PAGE_SEO_DATA } from '../data/seoData';

interface ToolFaqSectionProps {
  toolId?: ToolId;
  pageTab?: string;
}

export const ToolFaqSection: React.FC<ToolFaqSectionProps> = ({ toolId, pageTab }) => {
  const seoData = toolId ? TOOL_SEO_DATA[toolId] : pageTab ? PAGE_SEO_DATA[pageTab] : null;
  const faqList = seoData?.faq;

  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  if (!faqList || faqList.length === 0) return null;

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section aria-labelledby="faq-heading" className="mt-16 pt-10 border-t border-gray-200 dark:border-slate-800">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 id="faq-heading" className="text-2xl font-extrabold text-gray-900 dark:text-white">
          Everything You Need to Know About {seoData.h1}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
          Got questions? Here are clear, straightforward answers about using {seoData.title.split('—')[0]}.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqList.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700/80 overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full text-left px-6 py-4 flex items-center justify-between font-bold text-sm sm:text-base text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ml-2 ${
                    isOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-slate-700/50">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
