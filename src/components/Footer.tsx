import React from 'react';
import { PageId } from '../types';
import { useLocale } from '../context/LocaleContext';

interface FooterProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentPage, onNavigate }) => {
  const { t } = useLocale();

  return (
    <footer className="shrink-0 bg-white border-t border-gray-200 mt-12 py-6 px-6 sm:px-8 text-xs sm:text-sm font-medium text-gray-600">
      <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-gray-700">
          {t.footer.copyright} • {t.footer.tagline}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 font-semibold">
          <button
            onClick={() => onNavigate('avif-to-jpg')}
            className={`hover:text-teal-700 transition-colors cursor-pointer ${
              currentPage === 'avif-to-jpg' ? 'text-teal-700 underline underline-offset-4' : 'text-gray-600'
            }`}
          >
            {t.footer.navHome}
          </button>
          <button
            onClick={() => onNavigate('privacy')}
            className={`hover:text-teal-700 transition-colors cursor-pointer ${
              currentPage === 'privacy' ? 'text-teal-700 underline underline-offset-4' : 'text-gray-600'
            }`}
          >
            {t.footer.navPrivacy}
          </button>
          <button
            onClick={() => onNavigate('terms')}
            className={`hover:text-teal-700 transition-colors cursor-pointer ${
              currentPage === 'terms' ? 'text-teal-700 underline underline-offset-4' : 'text-gray-600'
            }`}
          >
            {t.footer.navTerms}
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`hover:text-teal-700 transition-colors cursor-pointer ${
              currentPage === 'about' ? 'text-teal-700 underline underline-offset-4' : 'text-gray-600'
            }`}
          >
            {t.footer.navAbout}
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`hover:text-teal-700 transition-colors cursor-pointer ${
              currentPage === 'contact' ? 'text-teal-700 underline underline-offset-4' : 'text-gray-600'
            }`}
          >
            {t.footer.navContact}
          </button>
        </div>
      </div>
    </footer>
  );
};
