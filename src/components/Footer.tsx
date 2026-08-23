import React from 'react';
import { PageId } from '../types';
import { useLocale } from '../context/LocaleContext';

interface FooterProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentPage, onNavigate }) => {
  const { t } = useLocale();

  const handleLinkClick = (page: PageId, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="w-full mt-16 overflow-hidden">
      {/* Top White Content Card Area with Soft Bottom Curve */}
      <div className="bg-white rounded-b-[2.5rem] sm:rounded-b-[3.5rem] px-6 sm:px-12 lg:px-16 pt-12 sm:pt-16 pb-12 sm:pb-16 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border-b border-gray-100 relative z-10">
        <div className="max-w-[1100px] mx-auto">
          {/* Upper Section: Heading on Left, Clean Legal Nav on Right */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-14 pb-12 sm:pb-16">
            {/* Left Column: Heading & Summary */}
            <div className="max-w-xl space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Free image conversion that runs in{' '}
                <span className="text-teal-600">your browser</span>
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                Fast, secure, and completely private batch conversion from AVIF to JPG with zero data uploads.
              </p>
            </div>

            {/* Right Column: Legal & Navigation Links (Without Home item) */}
            <div className="flex flex-col items-start space-y-2.5 min-w-[150px]">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Legal
              </span>
              <a
                id="footer-nav-privacy"
                href="/privacy"
                onClick={(e) => handleLinkClick('privacy', e)}
                className={`text-sm hover:text-teal-600 hover:underline transition-colors cursor-pointer text-left ${
                  currentPage === 'privacy' ? 'text-teal-700 font-bold underline' : 'text-gray-600'
                }`}
              >
                {t.footer.navPrivacy}
              </a>
              <a
                id="footer-nav-terms"
                href="/terms"
                onClick={(e) => handleLinkClick('terms', e)}
                className={`text-sm hover:text-teal-600 hover:underline transition-colors cursor-pointer text-left ${
                  currentPage === 'terms' ? 'text-teal-700 font-bold underline' : 'text-gray-600'
                }`}
              >
                {t.footer.navTerms}
              </a>
              <a
                id="footer-nav-about"
                href="/about"
                onClick={(e) => handleLinkClick('about', e)}
                className={`text-sm hover:text-teal-600 hover:underline transition-colors cursor-pointer text-left ${
                  currentPage === 'about' ? 'text-teal-700 font-bold underline' : 'text-gray-600'
                }`}
              >
                {t.footer.navAbout}
              </a>
              <a
                id="footer-nav-contact"
                href="/contact"
                onClick={(e) => handleLinkClick('contact', e)}
                className={`text-sm hover:text-teal-600 hover:underline transition-colors cursor-pointer text-left ${
                  currentPage === 'contact' ? 'text-teal-700 font-bold underline' : 'text-gray-600'
                }`}
              >
                {t.footer.navContact}
              </a>
            </div>
          </div>

          {/* Center Brand Icon & Copyright Metadata */}
          <div className="text-center pt-6 border-t border-gray-100 flex flex-col items-center justify-center space-y-2.5">
            {/* App Brand Logo Emblem */}
            <a
              href="/"
              onClick={(e) => handleLinkClick('avif-to-jpg', e)}
              className="w-8 h-8 rounded-lg bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center font-bold text-xs shadow-xs transition-colors cursor-pointer"
              title="AVIF to JPG Home"
            >
              A→J
            </a>

            <p className="text-xs text-gray-500 leading-relaxed">
              © {new Date().getFullYear()} AVIFtoJPG.in. All rights reserved.
              <br />
              <span className="text-gray-400">100% Client-Side • Fast, Private & Free</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Subtle Gradient Surface with Giant Brand Watermark */}
      <div className="relative bg-gradient-to-b from-teal-50/70 via-teal-100/50 to-teal-200/40 pt-8 sm:pt-12 pb-0 overflow-hidden">
        {/* Ambient Soft Glow Circle */}
        <div className="absolute top-4 sm:top-6 right-1/4 w-16 h-16 rounded-full bg-white/60 blur-[1px] pointer-events-none" />

        {/* Large Watermark in App's Default Font */}
        <div className="w-full text-center overflow-hidden pointer-events-none leading-none -mb-3 sm:-mb-5 md:-mb-7">
          <span className="text-[17vw] sm:text-[18vw] lg:text-[19vw] font-extrabold text-white/90 tracking-tight inline-block select-none leading-[0.78]">
            AVIF to JPG
          </span>
        </div>
      </div>
    </footer>
  );
};
