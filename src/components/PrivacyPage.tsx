import React from 'react';
import { PageId } from '../types';
import { useLocale } from '../context/LocaleContext';
import { Shield, Lock, ArrowLeft } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (page: PageId) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  const { t } = useLocale();
  const p = t.pages.privacy;

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8 md:p-10 space-y-7 text-gray-800">
      <div className="border-b border-gray-100 pb-4 space-y-2">
        <div className="flex items-center gap-2 text-teal-700 font-bold text-xs tracking-wider uppercase">
          <Shield className="w-4 h-4" />
          <span>{t.meta.privacyTitle}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {p.title}
        </h1>
        <p className="text-sm text-gray-600">
          {p.subtitle}
        </p>
      </div>

      <div className="bg-teal-50/80 border border-teal-200 rounded-lg p-5 sm:p-6 flex items-start gap-3.5">
        <Lock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="text-sm sm:text-base text-teal-950 leading-relaxed">
          <strong className="block font-semibold mb-1 text-teal-950">
            {p.intro}
          </strong>
          {p.fileProcessingText}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {p.fileProcessingTitle}
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          {p.fileProcessingText}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {p.dataCollectionTitle}
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          {p.dataCollectionText}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {p.cookiesTitle}
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          {p.cookiesText}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {p.thirdPartyTitle}
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          {p.thirdPartyText}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {p.rightsTitle}
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          {p.rightsText}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {p.contactTitle}
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          {p.contactText}
        </p>
      </section>

      <div className="pt-4 border-t border-gray-100 flex justify-start">
        <button
          onClick={() => onNavigate('avif-to-jpg')}
          className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.footer.navHome}</span>
        </button>
      </div>
    </div>
  );
};
