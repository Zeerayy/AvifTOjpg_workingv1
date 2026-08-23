import React, { useState } from 'react';
import { PageId } from '../types';
import { useLocale } from '../context/LocaleContext';
import { ChevronDown, Globe, Check } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { locale, t, setLocale, languages } = useLocale();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const currentLangObj = languages.find((l) => l.code === locale) || languages[0];

  const handleHomeClick = () => {
    onNavigate('avif-to-jpg');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 px-4 sm:px-8 py-3 flex items-center justify-between shrink-0">
      <div className="max-w-[1100px] mx-auto w-full flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="header-brand-logo-btn"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleHomeClick();
          }}
          className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-md py-1 cursor-pointer group"
          aria-label="AVIFtoJPG.in Home"
        >
          <div className="w-8 h-8 bg-teal-600 group-hover:bg-teal-700 transition-colors rounded flex items-center justify-center text-white font-bold text-xs shadow-xs">
            A→J
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-gray-800 group-hover:text-gray-900 leading-tight">
              AVIF<span className="text-teal-600">to</span>JPG<span className="text-gray-400 font-semibold">.in</span>
            </span>
            <span className="text-[10px] text-gray-400 font-medium tracking-wide">
              Free Online Image Converter
            </span>
          </div>
        </a>

        {/* Right Navigation & Language Selector */}
        <div className="flex items-center gap-3 text-sm">
          {/* Language Selector (16 Languages) */}
          <div className="relative">
            <button
              id="header-lang-btn"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="text-xs sm:text-sm font-medium text-gray-700 hover:text-teal-600 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-gray-50 border border-gray-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-colors cursor-pointer bg-white"
              aria-label="Language selector"
              aria-expanded={isLangOpen}
            >
              <Globe className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="hidden sm:inline">{currentLangObj.nativeName}</span>
              <span className="sm:hidden uppercase font-semibold">{locale}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setIsLangOpen(false)} />
                <div className="absolute right-0 mt-1.5 w-56 max-h-[380px] overflow-y-auto bg-white rounded-xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1),0_4px_10px_-2px_rgba(0,0,0,0.04)] border border-gray-200/90 py-1.5 z-30 text-xs divide-y divide-gray-100">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 flex items-center justify-between">
                    <span>{t.header.language}</span>
                    <span className="text-[10px] text-gray-400">16 Languages</span>
                  </div>
                  <div className="py-1">
                    {languages.map((lang) => {
                      const isSelected = locale === lang.code;
                      return (
                        <button
                          key={lang.code}
                          id={`lang-select-${lang.code}`}
                          onClick={() => {
                            setLocale(lang.code);
                            setIsLangOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-teal-50/60 transition-colors cursor-pointer ${
                            isSelected ? 'text-teal-700 font-bold bg-teal-50' : 'text-gray-700'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold">{lang.nativeName}</span>
                            <span className="text-[10px] text-gray-400">{lang.name}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-teal-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
