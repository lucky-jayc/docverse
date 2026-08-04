import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Support Form State
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportMsg, setSupportMsg] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const faqs = [
    {
      q: 'Are my uploaded PDF files safe and confidential?',
      a: 'Yes, 100%. Processing occurs directly in your web browser memory via client-side WebAssembly and JavaScript engines. Your files are never stored on external databases and are purged immediately when you refresh or close the tab.',
    },
    {
      q: 'What is the maximum file size for PDF operations?',
      a: 'Free plan users can upload files up to 25 MB. Premium and Business subscribers can upload files up to 500 MB with high-speed batch stream processing.',
    },
    {
      q: 'How does the Gemini AI OCR feature work?',
      a: 'Our OCR feature sends the visual page rendered canvas to the Gemini 2.5 Flash model server endpoint to recognize handwritten or scanned print text accurately, allowing you to copy, edit, or translate extracted text instantly.',
    },
    {
      q: 'Can I cancel my Premium subscription anytime?',
      a: 'Yes, you can manage or cancel your subscription at any time directly from your user dashboard with zero hidden fees.',
    },
    {
      q: 'Do you offer team accounts or bulk licensing for businesses?',
      a: 'Yes! Our Business Plan supports up to 10 team seats, shared cloud workspaces, centralized billing, and custom admin permissions.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setSupportMsg('');
      setTicketSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>24/7 Support & Documentation</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          How can we help you?
        </h1>
        
        {/* Search */}
        <div className="mt-6 relative max-w-md mx-auto">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs, tools, or topics..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium shadow-sm"
          />
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-100 dark:border-slate-700/80 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-sm text-gray-900 dark:text-white flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    openFaqIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openFaqIndex === idx && (
                <div className="p-4 pt-0 text-xs text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-50 dark:border-slate-700/50 bg-gray-50/50 dark:bg-slate-900/30">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support Ticket Form */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Need Additional Assistance?</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Send our technical team a support ticket</p>
          </div>
        </div>

        {ticketSubmitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-center font-semibold text-sm flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Support ticket received! We will reply via email within 2 hours.</span>
          </div>
        ) : (
          <form onSubmit={handleSupportSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={supportName}
                  onChange={(e) => setSupportName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Message / Query</label>
              <textarea
                required
                rows={4}
                value={supportMsg}
                onChange={(e) => setSupportMsg(e.target.value)}
                placeholder="Describe your issue or feature request..."
                className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Ticket</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
