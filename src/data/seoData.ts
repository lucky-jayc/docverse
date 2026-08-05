import { ToolId } from '../types';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  h1: string;
  h2: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  faq?: FAQItem[];
  relatedTools?: ToolId[];
  features?: string[];
}

export const SITE_NAME = 'DocVerse';
export const SITE_URL = 'https://docverse.app';
export const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1200&q=80';

export const PAGE_SEO_DATA: Record<string, SEOMetadata> = {
  home: {
    title: 'DocVerse — Free Online PDF Tools: Merge, Split, Compress & OCR PDFs',
    description: 'The ultimate privacy-first online PDF toolkit. Merge, split, compress, protect, unlock, and run Gemini AI OCR on PDF files instantly in your browser.',
    keywords: 'pdf editor online, merge pdf free, split pdf, compress pdf, ocr pdf gemini, convert image to pdf, pdf security, privacy pdf tools',
    canonicalPath: '/',
    h1: 'Next-Gen PDF & Document Suite for Fast, Secure Processing',
    h2: '12+ Powerful PDF Tools Running Entirely in Your Browser',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    twitterCard: 'summary_large_image',
    faq: [
      {
        question: 'Is DocVerse free to use?',
        answer: 'Yes! DocVerse offers generous daily free usage across all 12 PDF tools without requiring a credit card.'
      },
      {
        question: 'Are my PDF files safe on DocVerse?',
        answer: '100% safe. Processing happens directly in your browser or secure memory session. Your files are never stored or monetized.'
      },
      {
        question: 'Does DocVerse work on mobile devices?',
        answer: 'Yes, DocVerse is completely responsive and optimized for smartphones, tablets, laptops, and desktop browsers.'
      }
    ],
    features: [
      'Zero Cloud Storage Risk: Files processed in memory',
      'Gemini AI Document Intelligence & OCR',
      'Lightning Fast High-Resolution PDF Rendering',
      'Unlimited File Size Support up to 500 MB'
    ]
  },

  pricing: {
    title: 'Pricing & Subscription Plans — Free & Unlimited Pro | DocVerse',
    description: 'Explore affordable pricing for DocVerse. Choose Free for casual use or upgrade to Pro or Business for unlimited processing, AI OCR, and priority support.',
    keywords: 'docverse pricing, pdf editor cost, unlimited pdf merge, free vs pro pdf tools, business pdf subscription',
    canonicalPath: '/#pricing',
    h1: 'Simple, Transparent Pricing for Every Document Workflow',
    h2: 'Choose the Right Plan for Your Personal or Enterprise Needs',
    ogType: 'website',
    faq: [
      {
        question: 'Can I cancel my Pro subscription at any time?',
        answer: 'Yes, you can cancel your subscription at any time with a single click from your user dashboard with no cancellation fees.'
      },
      {
        question: 'Do you offer team or enterprise discounts?',
        answer: 'Yes, our Business plan offers discounted multi-seat licenses, dedicated account support, and custom SLAs.'
      }
    ]
  },

  blog: {
    title: 'PDF Guides, AI Workflows & Document Security Blog | DocVerse',
    description: 'Learn step-by-step PDF optimization tips, digital security best practices, and AI document extraction tutorials on the official DocVerse blog.',
    keywords: 'pdf tips, document workflow, how to compress pdf, digital signatures, gemini ocr guide, pdf security',
    canonicalPath: '/#blog',
    h1: 'DocVerse Insights: Guides, Tutorials & Document Tech',
    h2: 'Master PDF Processing and AI Productivity Workflows',
    ogType: 'blog'
  },

  help: {
    title: 'Help Center & Knowledge Base — DocVerse PDF Toolkit',
    description: 'Find quick answers, troubleshooting steps, and customer support for all DocVerse online PDF tools and Gemini AI features.',
    keywords: 'docverse help, pdf troubleshooting, how to merge pdfs, fix corrupt pdf, docverse support',
    canonicalPath: '/#help',
    h1: 'DocVerse Support & Knowledge Center',
    h2: 'Frequently Asked Questions and Helpful Guides',
    faq: [
      {
        question: 'Why did my PDF fail to process?',
        answer: 'Ensure your PDF file is not corrupt or protected by a strong unknown password. If it is password-protected, use our Unlock PDF tool first.'
      },
      {
        question: 'How do I contact DocVerse support?',
        answer: 'You can submit a ticket directly through our Help Center or email support@docverse.app for 24/7 assistance.'
      }
    ]
  },

  dashboard: {
    title: 'User Dashboard & Activity History | DocVerse',
    description: 'Track your recent PDF processing activity, daily usage stats, active plan status, and favorite document tools.',
    keywords: 'user dashboard, docverse account, pdf activity log, profile settings',
    canonicalPath: '/#dashboard',
    h1: 'Your Personal DocVerse Dashboard',
    h2: 'Manage Account, Recent History & Saved Preferences'
  },

  admin: {
    title: 'Admin Analytics Panel | DocVerse',
    description: 'System administration and performance telemetry for DocVerse platform.',
    keywords: 'admin panel, system analytics, docverse telemetry',
    canonicalPath: '/#admin',
    h1: 'DocVerse Platform Telemetry',
    h2: 'Real-time Usage Stats & System Health'
  }
};

export const TOOL_SEO_DATA: Record<ToolId, SEOMetadata> = {
  merge: {
    title: 'Merge PDF Online — Combine Multiple PDFs for Free | DocVerse',
    description: 'Combine two or more PDF files into one single document seamlessly. Reorder pages, preserve original quality, and download in seconds.',
    keywords: 'merge pdf, combine pdf files, join pdf online, free pdf merger, binder pdf',
    canonicalPath: '/#tool-merge',
    h1: 'Merge PDF Files Online for Free',
    h2: 'Combine Documents into a Single Organized PDF in Seconds',
    relatedTools: ['split', 'compress', 'rearrange'],
    faq: [
      {
        question: 'Can I reorder files before merging?',
        answer: 'Yes! You can drag and drop your uploaded files into any custom sequence before executing the merge.'
      },
      {
        question: 'Is there a limit on how many PDFs I can merge?',
        answer: 'Free users can merge up to 20 files at once. Pro users enjoy unlimited file merging.'
      },
      {
        question: 'Does merging affect document quality or bookmarks?',
        answer: 'DocVerse preserves vector text clarity, page orientation, images, and embedded fonts without loss of fidelity.'
      }
    ],
    features: [
      'Combine unlimited PDF documents into 1 file',
      'Drag & drop thumbnail reordering',
      'Preserve original image resolution and links',
      'Works fast on Windows, Mac, iOS, and Android'
    ]
  },

  split: {
    title: 'Split PDF Online — Extract PDF Pages Free | DocVerse',
    description: 'Separate a large PDF into multiple files or extract specific page ranges quickly with exact visual precision.',
    keywords: 'split pdf, extract pdf pages, separate pdf pages online, pdf cutter, divide pdf',
    canonicalPath: '/#tool-split',
    h1: 'Split PDF Documents & Extract Pages',
    h2: 'Divide Large PDFs into Individual Pages or Custom Ranges',
    relatedTools: ['merge', 'delete-pages', 'rearrange'],
    faq: [
      {
        question: 'How do I specify which pages to extract?',
        answer: 'You can type custom page ranges (e.g. 1-3, 5, 8-12) or click directly on rendered visual thumbnails to pick pages.'
      },
      {
        question: 'Will each extracted page become its own PDF?',
        answer: 'You can extract selected pages as a single unified PDF or separate files as needed.'
      }
    ],
    features: [
      'Visual thumbnail page selector',
      'Flexible range syntax support (e.g., 1-5, 8, 11-15)',
      'Instant downloading with zero server delay'
    ]
  },

  compress: {
    title: 'Compress PDF Online — Reduce PDF File Size | DocVerse',
    description: 'Shrink your PDF file size by up to 75% without compromising text or visual quality. Perfect for email attachments and uploads.',
    keywords: 'compress pdf, reduce pdf size, shrink pdf online, pdf optimizer, smaller pdf file',
    canonicalPath: '/#tool-compress',
    h1: 'Compress PDF Files Online',
    h2: 'Reduce File Size While Maintaining Maximum Visual Resolution',
    relatedTools: ['merge', 'ocr', 'protect'],
    faq: [
      {
        question: 'How much can I reduce my PDF file size?',
        answer: 'Depending on the images and stream compression level chosen, reduction typically ranges from 30% to 75%.'
      },
      {
        question: 'Does compression ruin text quality?',
        answer: 'No. Our intelligent optimization preserves crisp vector typography while compressing redundant bitmap data.'
      }
    ],
    features: [
      '3 Compression Levels: Recommended, Extreme, and Mild',
      'Real-time before and after size calculation',
      'Ideal for email limits and portal submissions'
    ]
  },

  'img-to-pdf': {
    title: 'Image to PDF Converter — Convert JPG, PNG to PDF | DocVerse',
    description: 'Convert JPG, PNG, WEBP, and BMP images into clean, formatted PDF documents. Adjust margins, page orientation, and order.',
    keywords: 'jpg to pdf, png to pdf, image to pdf converter, photo to pdf, convert pictures to pdf',
    canonicalPath: '/#tool-img-to-pdf',
    h1: 'Convert Images (JPG, PNG) to PDF Online',
    h2: 'Turn Photos, Scans & Graphic Designs into Professional PDFs',
    relatedTools: ['pdf-to-img', 'ocr', 'watermark'],
    faq: [
      {
        question: 'Can I combine multiple photos into one PDF?',
        answer: 'Yes, upload all your photo files together and DocVerse will combine them into a single multi-page PDF document.'
      },
      {
        question: 'Which image formats are supported?',
        answer: 'We support JPG, JPEG, PNG, WEBP, BMP, and GIF image files.'
      }
    ],
    features: [
      'Custom page margins and orientation (Portrait/Landscape)',
      'Standard page sizes (A4, Letter, Legal, Fit to Image)',
      'High-dpi crisp printing quality'
    ]
  },

  'pdf-to-img': {
    title: 'PDF to Image Converter — Extract JPG & PNG | DocVerse',
    description: 'Convert PDF pages into high-resolution JPG or PNG images. Save individual pages or batch convert your document.',
    keywords: 'pdf to jpg, pdf to png, pdf to image converter, extract images from pdf',
    canonicalPath: '/#tool-pdf-to-img',
    h1: 'Convert PDF Pages to High-Resolution Images',
    h2: 'Export PDF Pages into Clean JPG or PNG Image Files',
    relatedTools: ['img-to-pdf', 'ocr', 'split'],
    faq: [
      {
        question: 'Can I choose between JPG and PNG output?',
        answer: 'Yes! Choose PNG for maximum lossless quality or JPG for smaller file sizes.'
      }
    ],
    features: [
      'High DPI canvas rendering engine',
      'Export individual pages or entire documents',
      'No loss of image color fidelity'
    ]
  },

  rotate: {
    title: 'Rotate PDF Pages Online — Turn PDF Orientation | DocVerse',
    description: 'Permanently rotate upside-down or sideways PDF pages 90°, 180°, or 270° clockwise or counter-clockwise.',
    keywords: 'rotate pdf, turn pdf pages, fix pdf orientation, rotate pdf pages online free',
    canonicalPath: '/#tool-rotate',
    h1: 'Rotate PDF Pages Online',
    h2: 'Fix Page Orientation for Individual Pages or Entire Documents',
    relatedTools: ['rearrange', 'delete-pages', 'watermark'],
    faq: [
      {
        question: 'Can I rotate just one specific page?',
        answer: 'Yes! Click the rotation button on individual page thumbnails to rotate single pages without changing the rest.'
      }
    ],
    features: [
      'Rotate individual pages or all pages simultaneously',
      'Visual live canvas preview before saving',
      'Permanent rotation metadata saved directly to file'
    ]
  },

  'delete-pages': {
    title: 'Delete PDF Pages Online — Remove Blank Pages | DocVerse',
    description: 'Remove unnecessary, blank, or unwanted pages from your PDF file with visual click-to-delete simplicity.',
    keywords: 'delete pdf pages, remove pages from pdf, delete blank pages pdf, edit pdf pages',
    canonicalPath: '/#tool-delete-pages',
    h1: 'Remove Unwanted Pages from PDF',
    h2: 'Delete Blank Pages or Extra Content with a Single Click',
    relatedTools: ['split', 'rearrange', 'rotate'],
    faq: [
      {
        question: 'How do I delete multiple pages at once?',
        answer: 'Simply click on each page thumbnail you wish to remove. They will highlight in red and be stripped on process.'
      }
    ],
    features: [
      'Visual thumbnail grid selection',
      'Batch page removal in one operation',
      'Maintains document structure and table of contents'
    ]
  },

  rearrange: {
    title: 'Rearrange PDF Pages — Reorder Pages Online | DocVerse',
    description: 'Drag and drop PDF thumbnail previews to reorder pages in any custom sequence you prefer.',
    keywords: 'rearrange pdf pages, reorder pdf pages, swap pdf pages, organize pdf pages',
    canonicalPath: '/#tool-rearrange',
    h1: 'Reorder & Rearrange PDF Pages',
    h2: 'Drag and Drop Pages to Customize Your PDF Structure',
    relatedTools: ['rotate', 'delete-pages', 'merge'],
    faq: [
      {
        question: 'How do I change page order?',
        answer: 'Drag any page thumbnail card and drop it in the desired position in the visual thumbnail grid.'
      }
    ],
    features: [
      'Intuitive drag-and-drop page reordering',
      'Real-time page numbering updates',
      'Combine reordering with rotation controls'
    ]
  },

  watermark: {
    title: 'Watermark PDF Online — Add Custom Text Watermark | DocVerse',
    description: 'Protect your intellectual property by adding custom text watermarks with adjustable opacity, angle, and font styling.',
    keywords: 'watermark pdf, add watermark to pdf, stamp pdf, confidential pdf watermark',
    canonicalPath: '/#tool-watermark',
    h1: 'Add Custom Watermark to PDF Documents',
    h2: 'Protect Drafts, Contracts, and Intellectual Property',
    relatedTools: ['protect', 'compress', 'img-to-pdf'],
    faq: [
      {
        question: 'Can I customize the watermark position and opacity?',
        answer: 'Yes! You can adjust text, font size, opacity, color, and angle of rotation.'
      }
    ],
    features: [
      'Custom opacity transparency controls',
      'Diagonal rotation and color selection',
      'Applies to all pages uniformly'
    ]
  },

  protect: {
    title: 'Protect PDF with Password — Encrypt PDF Online | DocVerse',
    description: 'Encrypt your confidential PDF documents with standard password security to prevent unauthorized viewing or printing.',
    keywords: 'protect pdf, password protect pdf, encrypt pdf online, secure pdf file',
    canonicalPath: '/#tool-protect',
    h1: 'Password Protect & Encrypt PDF Files',
    h2: 'Lock Confidential Financials, Contracts, and Personal Documents',
    relatedTools: ['unlock', 'watermark', 'compress'],
    faq: [
      {
        question: 'What encryption level is used?',
        answer: 'DocVerse uses standard PDF stream encryption compatible with Adobe Acrobat and standard PDF viewers.'
      }
    ],
    features: [
      'Strong password protection',
      'Prevents unauthorized opening and printing',
      'Zero server retention of passwords'
    ]
  },

  unlock: {
    title: 'Unlock PDF Online — Remove PDF Password Security | DocVerse',
    description: 'Remove password protection and permissions restrictions from protected PDF files you have authorization to access.',
    keywords: 'unlock pdf, remove pdf password, decrypt pdf online, unlock protected pdf',
    canonicalPath: '/#tool-unlock',
    h1: 'Unlock Password-Protected PDF Files',
    h2: 'Remove Security Restrictions and Unlock Editing Capabilities',
    relatedTools: ['protect', 'split', 'compress'],
    faq: [
      {
        question: 'Do I need to know the original password?',
        answer: 'Yes, for user-encrypted PDFs you must enter the password once to authorize removal of restrictions.'
      }
    ],
    features: [
      'Removes copy, print, and editing restrictions',
      'Fast client-side decryption',
      'Saves clean unlocked PDF ready for sharing'
    ]
  },

  ocr: {
    title: 'OCR PDF with Gemini AI — Extract & Summarize Text | DocVerse',
    description: 'Extract text from scanned PDFs and images using Google Gemini AI. Summarize, translate, and copy text with high precision.',
    keywords: 'ocr pdf, gemini ai ocr, extract text from pdf, scanned pdf to text, ai document reader',
    canonicalPath: '/#tool-ocr',
    h1: 'Gemini AI Document Intelligence & OCR',
    h2: 'Extract Text from Scans, Translate Languages & Summarize Documents',
    relatedTools: ['img-to-pdf', 'compress', 'pdf-to-img'],
    faq: [
      {
        question: 'How accurate is the Gemini AI OCR engine?',
        answer: 'Gemini AI utilizes state-of-the-art multimodal vision models providing near 99% extraction accuracy even on handwritten or low-light scans.'
      },
      {
        question: 'Can I translate the extracted text into other languages?',
        answer: 'Yes! Built-in AI translation lets you translate extracted text into English, Spanish, French, German, Japanese, and dozens of languages.'
      }
    ],
    features: [
      'Multimodal AI optical character recognition',
      'Automated executive bullet-point summarization',
      'Instant copy to clipboard and text file download'
    ]
  }
};
