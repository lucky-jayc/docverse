import React, { useEffect } from 'react';
import { ToolId } from '../types';
import { PAGE_SEO_DATA, TOOL_SEO_DATA, SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, SEOMetadata } from '../data/seoData';

interface SEOHeadProps {
  activeTab: string;
  activeToolId: ToolId | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ activeTab, activeToolId }) => {
  // Get active metadata
  let seo: SEOMetadata = PAGE_SEO_DATA.home;

  if (activeTab === 'home' && activeToolId && TOOL_SEO_DATA[activeToolId]) {
    seo = TOOL_SEO_DATA[activeToolId];
  } else if (PAGE_SEO_DATA[activeTab]) {
    seo = PAGE_SEO_DATA[activeTab];
  }

  const pageUrl = `${SITE_URL}${seo.canonicalPath}`;
  const ogImage = seo.ogImage || DEFAULT_OG_IMAGE;

  useEffect(() => {
    // 1. Update Document Title
    document.title = seo.title;

    // Helper to set meta attribute
    const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', seo.description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', seo.keywords);
    setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large');

    // 3. Open Graph Metadata
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', seo.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', seo.description);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', seo.ogType || 'website');
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', pageUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);

    // 4. Twitter Card Metadata
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', seo.twitterCard || 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', pageUrl);

    // 6. JSON-LD Structured Data
    const jsonLdScriptId = 'docverse-seo-jsonld';
    let scriptEl = document.getElementById(jsonLdScriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = jsonLdScriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const structuredDataArray: object[] = [];

    // SoftwareApplication Schema
    structuredDataArray.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': activeToolId ? `${seo.h1} — ${SITE_NAME}` : SITE_NAME,
      'url': pageUrl,
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'All',
      'description': seo.description,
      'browserRequirements': 'Requires JavaScript and HTML5 canvas',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock',
      },
    });

    // BreadcrumbList Schema
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': SITE_URL,
      },
    ];

    if (activeToolId) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        'position': 2,
        'name': 'Tools',
        'item': `${SITE_URL}/#tools-section`,
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        'position': 3,
        'name': seo.h1,
        'item': pageUrl,
      });
    } else if (activeTab !== 'home') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        'position': 2,
        'name': activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
        'item': pageUrl,
      });
    }

    structuredDataArray.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbItems,
    });

    // FAQPage Schema if FAQ items exist
    if (seo.faq && seo.faq.length > 0) {
      structuredDataArray.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': seo.faq.map((item) => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer,
          },
        })),
      });
    }

    scriptEl.textContent = JSON.stringify(structuredDataArray, null, 2);

  }, [activeTab, activeToolId, seo, pageUrl, ogImage]);

  return null;
};
