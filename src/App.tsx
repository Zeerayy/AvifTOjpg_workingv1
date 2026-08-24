import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { TOOL_CONFIGS, SEO_ARTICLES } from './utils/seoData';
import { LocaleProvider, useLocale } from './context/LocaleContext';
import { Header } from './components/Header';
import { HowToSection } from './components/HowToSection';
import { ConverterCard } from './components/ConverterCard';
import { SeoArticle } from './components/SeoArticle';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { ShieldCheck, Zap, Sliders, CheckCircle2 } from 'lucide-react';

function AppContent() {
  const { locale, t } = useLocale();

  // Determine initial page from window.location.pathname or hash
  const getInitialPage = (): PageId => {
    try {
      const path = window.location.pathname.replace(/^\//, '') || '';
      const hash = window.location.hash.replace(/^#\/?/, '') || '';
      const lookup = path || hash;

      if (lookup === 'privacy') return 'privacy';
      if (lookup === 'terms') return 'terms';
      if (lookup === 'about') return 'about';
      if (lookup === 'contact') return 'contact';
      if (lookup === 'avif-to-jpg' || lookup === '') return 'avif-to-jpg';
    } catch (e) {
      // fallback
    }
    return 'avif-to-jpg';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);

  // Sync route and popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Update document title, meta descriptions, and canonical tags based on active locale & page
  useEffect(() => {
    let title = t.meta.pageTitle || 'AVIF to JPG - Convert AVIF to JPG for Free';
    let description =
      t.meta.metaDescription ||
      'Convert AVIF images to JPG quickly and easily. Process images directly in your browser with our free, private AVIF to JPG converter.';
    let canonical = `https://aviftojpg.in/${currentPage === 'avif-to-jpg' ? '' : currentPage}`;

    if (currentPage === 'privacy') {
      title = t.meta.privacyTitle || 'Privacy Policy – AVIFtoJPG.in';
      description = t.meta.privacyDescription;
    } else if (currentPage === 'terms') {
      title = t.meta.termsTitle || 'Terms of Service – AVIFtoJPG.in';
      description = t.meta.termsDescription;
    } else if (currentPage === 'about') {
      title = t.meta.aboutTitle || 'About Us – AVIFtoJPG.in';
      description = t.meta.aboutDescription;
    } else if (currentPage === 'contact') {
      title = t.meta.contactTitle || 'Contact Us – AVIFtoJPG.in';
      description = t.meta.contactDescription;
    }

    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Update canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', canonical);
    }

    // Scroll to top on page navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, locale, t]);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    try {
      const newUrl = page === 'avif-to-jpg' ? '/' : `/${page}`;
      window.history.pushState(null, '', newUrl);
    } catch {
      window.location.hash = page === 'avif-to-jpg' ? '' : page;
    }
  };

  const isToolPage = currentPage === 'avif-to-jpg';
  const currentToolConfig = TOOL_CONFIGS['avif-to-jpg'];
  const currentArticle = SEO_ARTICLES['avif-to-jpg'];

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6f7] text-[#333333] font-sans">
      {/* Top Utility Header */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1100px] w-full mx-auto p-4 sm:p-6 space-y-6">
        {isToolPage ? (
          <div className="space-y-6">
            {/* Desktop 2-Column: Left (Converter Card with Top Drop Area + Quick Info) & Right (Sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Main Converter Column (8 cols) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <ConverterCard
                  config={currentToolConfig}
                  onNavigate={handleNavigate}
                />

                {/* 2-Card Quick Explanations (1-Sentence Teasers) */}
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-5 sm:p-6 border border-gray-200/85 rounded-xl shadow-[0_2px_14px_-2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] space-y-2">
                    <h2 className="text-base font-bold text-gray-900 border-l-4 border-teal-600 pl-2.5">
                      {t.content.whatIsAvifTitle}
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {t.content.whatIsAvifTeaser || 'AVIF is a modern, high-efficiency image format engineered for superior compression and smaller file sizes across the web.'}
                    </p>
                  </div>
                  <div className="bg-white p-5 sm:p-6 border border-gray-200/85 rounded-xl shadow-[0_2px_14px_-2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] space-y-2">
                    <h2 className="text-base font-bold text-gray-900 border-l-4 border-teal-600 pl-2.5">
                      {t.content.whyConvertTitle}
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {t.content.whyConvertTeaser || 'Converting to JPG ensures universal compatibility so your images open, edit, and share seamlessly on every device and platform.'}
                    </p>
                  </div>
                </section>
              </div>

              {/* Sidebar Column (4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Privacy First Highlight Card */}
                <div className="bg-teal-900 text-white p-5 sm:p-6 rounded-xl border border-teal-800/80 shadow-[0_4px_20px_-2px_rgba(13,148,136,0.25),0_2px_6px_-1px_rgba(0,0,0,0.06)] space-y-2.5">
                  <div className="flex items-center gap-2 text-teal-300">
                    <ShieldCheck className="w-5 h-5" />
                    <h2 className="text-xs font-bold uppercase tracking-widest text-teal-200">
                      {t.content.areFilesUploadedTitle || 'Privacy First'}
                    </h2>
                  </div>
                  <p className="text-sm text-teal-50/95 leading-relaxed">
                    {t.content.areFilesUploadedBody || 'Your images are processed 100% locally in your browser. We never see your data, and nothing is uploaded to our servers.'}
                  </p>
                  <div className="pt-1">
                    <a
                      href="/privacy"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate('privacy');
                      }}
                      className="text-xs font-medium text-teal-300 hover:text-white underline inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {t.footer.navPrivacy} →
                    </a>
                  </div>
                </div>
                
                {/* Key Benefits Card in Sidebar */}
                <div className="bg-white border border-gray-200/85 rounded-xl p-5 sm:p-6 shadow-[0_2px_14px_-2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] space-y-3.5">
                  <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Why Use AVIFtoJPG.in
                  </div>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span><strong className="text-gray-900 font-semibold">100% Free & Unlimited:</strong> Convert as many images as you need.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Zap className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span><strong className="text-gray-900 font-semibold">Real-Time Processing:</strong> Instant client-side conversion.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Sliders className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span><strong className="text-gray-900 font-semibold">Quality Control:</strong> Adjustable JPEG compression slider.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span><strong className="text-gray-900 font-semibold">Zero Server Uploads:</strong> Safe, secure, and fully private.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How to Convert Section */}
            <HowToSection config={currentToolConfig} />

            {/* In-depth SEO Article & FAQs */}
            <SeoArticle
              article={currentArticle}
              config={currentToolConfig}
            />
          </div>
        ) : (
          /* Legal & Information Pages (Privacy, Terms, About, Contact) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              {currentPage === 'privacy' && (
                <PrivacyPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'terms' && (
                <TermsPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'about' && (
                <AboutPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'contact' && (
                <ContactPage onNavigate={handleNavigate} />
              )}
            </div>

            {/* Sidebar & Privacy Box on Info Pages */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-teal-900 text-white p-5 sm:p-6 rounded-xl border border-teal-800/80 shadow-[0_4px_20px_-2px_rgba(13,148,136,0.25),0_2px_6px_-1px_rgba(0,0,0,0.06)] space-y-2">
                <div className="flex items-center gap-2 text-teal-400">
                  <ShieldCheck className="w-4 h-4" />
                  <h2 className="text-xs font-bold uppercase tracking-widest">
                    {t.content.areFilesUploadedTitle || 'Privacy First'}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-teal-50/95 leading-relaxed">
                  {t.content.areFilesUploadedBody || 'Your images are processed 100% locally in your browser. We never see your data, and nothing is uploaded to our servers.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Clean Utility Footer */}
      <Footer currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  );
}
