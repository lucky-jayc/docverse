import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: '10 Essential PDF Hacks Every Student Needs to Know',
    slug: '10-essential-pdf-hacks-students',
    excerpt: 'Learn how to combine lecture slides, compress huge research papers, and search scanned PDFs instantly.',
    content: `
### Work Smarter, Not Harder in College

As a student, you encounter dozens of PDF documents every week: lecture slides, research papers, lab reports, and textbooks. Managing them efficiently saves hours of frustration.

#### 1. Merge All Lecture Slides into One Semester Notebook
Instead of opening 15 separate slide decks before exams, merge them into a single PDF. You can then use quick search across the entire course material.

#### 2. Compress PDF Files for Email & Portal Submissions
Many university portals (like Canvas or Blackboard) limit file uploads to 10MB or 25MB. Using our **Compress PDF** tool reduces file sizes by up to 75% without compromising chart clarity or text readability.

#### 3. Extract Scanned Text with AI OCR
Got a scanned library book chapter or printed worksheet? Use our **OCR Text & AI** tool powered by Gemini AI to transform image scans into searchable, editable plain text.
    `,
    category: 'Student Resources',
    readTime: '4 min read',
    date: 'August 1, 2026',
    author: 'Sarah Jenkins',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'blog-2',
    title: 'How to Secure Confidential Business PDFs Before Sharing',
    slug: 'secure-confidential-business-pdfs',
    excerpt: 'Protect your sensitive financial reports, legal contracts, and client proposals with passwords and watermarks.',
    content: `
### Protecting Enterprise Intellectual Property

Data leaks and unauthorized document sharing can severely impact businesses. Before sending sensitive contracts or pitch decks, follow these security best practices.

#### Add Semi-Transparent Draft or Confidential Watermarks
Use our **Watermark PDF** tool to stamp company logos or text such as *"CONFIDENTIAL - FOR JOHN DOE ONLY"* across all document pages.

#### Password Protect High-Value Financial Files
Encrypt sensitive attachments using 256-bit AES protection with the **Protect PDF** tool so only authorized password holders can open them.
    `,
    category: 'Business Documents',
    readTime: '6 min read',
    date: 'July 28, 2026',
    author: 'Michael Vance',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'blog-3',
    title: 'Complete Guide to Organizing & Rearranging PDF Pages',
    slug: 'guide-rearranging-organizing-pdf-pages',
    excerpt: 'Easily reorder pages, delete blank scanner pages, and split chapters with drag-and-drop ease.',
    content: `
### Clean Up Scanned Documents Effortlessly

When scanning multi-page contracts or reports, scanner feeders frequently insert blank pages or flip pages upside down. 

With PDF Toolkit's drag-and-drop page visualizer, you can rotate inverted pages, delete unwanted blanks, and re-sequence pages in seconds right in your web browser.
    `,
    category: 'Office Productivity',
    readTime: '3 min read',
    date: 'July 15, 2026',
    author: 'Elena Rostova',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
  },
];
