import React, { useState } from 'react';
import { BookOpen, Search, Clock, User, ArrowRight, X } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';
import { BlogPost } from '../types';

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = ['All', 'Student Resources', 'Business Documents', 'Office Productivity', 'PDF Tips'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>PDF Productivity & Tech Insights</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          PDF Toolkit Blog & Resources
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
          Guides, tutorials, and productivity hacks to optimize your digital document workflow.
        </p>
      </div>

      {/* Filter Pills & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium"
          />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setActiveArticle(post)}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="h-48 overflow-hidden relative">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {post.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-4 text-xs text-gray-400 mb-2">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-300 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Article Modal Reader */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 border border-gray-200 dark:border-slate-800 shadow-2xl relative custom-scrollbar">
            
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              {activeArticle.category}
            </span>

            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">
              {activeArticle.title}
            </h2>

            <div className="flex items-center space-x-4 text-xs text-gray-400 my-4 pb-4 border-b border-gray-100 dark:border-slate-800">
              <span className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5" />
                <span>By {activeArticle.author}</span>
              </span>
              <span>•</span>
              <span>{activeArticle.date}</span>
              <span>•</span>
              <span>{activeArticle.readTime}</span>
            </div>

            <div className="prose dark:prose-invert text-sm text-gray-700 dark:text-gray-300 space-y-4 whitespace-pre-wrap">
              {activeArticle.content}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
