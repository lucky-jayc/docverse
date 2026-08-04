import React, { useState } from 'react';
import { FileText, ShieldCheck, Heart, Sparkles, Code, FileCode, Check } from 'lucide-react';
import { ToolId } from '../types';

interface FooterProps {
  onSelectTool: (toolId: ToolId) => void;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTool, setActiveTab }) => {
  const [showSitemap, setShowSitemap] = useState(false);

  return (
    <footer className="bg-slate-900 text-gray-300 border-t border-slate-800 transition-colors pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Doc<span className="text-emerald-400">Verse</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every PDF tool you need in one fast, secure, and intuitive web application. Converted safely in browser memory.
            </p>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Retention Auto-Cleanup</span>
            </div>
          </div>

          {/* Col 2: Popular Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Popular PDF Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { onSelectTool('merge'); setActiveTab('home'); }} className="hover:text-emerald-400 transition-colors">
                  Merge PDF Online
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectTool('compress'); setActiveTab('home'); }} className="hover:text-emerald-400 transition-colors">
                  Compress PDF File Size
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectTool('split'); setActiveTab('home'); }} className="hover:text-emerald-400 transition-colors">
                  Split PDF Pages
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectTool('img-to-pdf'); setActiveTab('home'); }} className="hover:text-emerald-400 transition-colors">
                  Convert JPG to PDF
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectTool('ocr'); setActiveTab('home'); }} className="hover:text-emerald-400 transition-colors">
                  Gemini AI OCR Text Scan
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Platform Views</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-emerald-400 transition-colors">Dashboard</button></li>
              <li><button onClick={() => setActiveTab('pricing')} className="hover:text-emerald-400 transition-colors">Pricing & Plans</button></li>
              <li><button onClick={() => setActiveTab('blog')} className="hover:text-emerald-400 transition-colors">Blog & Guides</button></li>
              <li><button onClick={() => setActiveTab('help')} className="hover:text-emerald-400 transition-colors">Help Center & FAQ</button></li>
              <li><button onClick={() => setActiveTab('admin')} className="hover:text-emerald-400 transition-colors">Admin Console</button></li>
            </ul>
          </div>

          {/* Col 4: SEO & Security */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">SEO & Metadata</h4>
            <p className="text-xs text-gray-400 mb-3">
              Optimized for search engines with structured JSON-LD schema markup and sitemaps.
            </p>
            <button
              onClick={() => setShowSitemap(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-emerald-400 hover:bg-slate-700 transition-colors flex items-center space-x-1"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>View XML Sitemap / Robots</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} DocVerse SaaS. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-gray-300 cursor-pointer">WCAG 2.1 AA Compliant</span>
          </div>
        </div>

      </div>

      {/* Sitemap Modal */}
      {showSitemap && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-800 shadow-2xl relative text-gray-300">
            <button
              onClick={() => setShowSitemap(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-white mb-3">SEO XML Sitemap & Robots.txt</h3>
            <pre className="p-4 bg-slate-950 rounded-2xl text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-60 border border-slate-800">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://docverse.app/</loc><priority>1.0</priority></url>
  <url><loc>https://docverse.app/merge-pdf</loc><priority>0.9</priority></url>
  <url><loc>https://docverse.app/compress-pdf</loc><priority>0.9</priority></url>
  <url><loc>https://docverse.app/split-pdf</loc><priority>0.9</priority></url>
  <url><loc>https://docverse.app/ocr-text</loc><priority>0.8</priority></url>
</urlset>`}
            </pre>
          </div>
        </div>
      )}
    </footer>
  );
};
