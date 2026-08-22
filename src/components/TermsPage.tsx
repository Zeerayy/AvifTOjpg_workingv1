import React from 'react';
import { PageId } from '../types';
import { useLocale } from '../context/LocaleContext';
import { Scale, ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  onNavigate: (page: PageId) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  const { t } = useLocale();
  const tm = t.pages.terms;

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8 md:p-10 space-y-7 text-gray-800">
      <div className="border-b border-gray-100 pb-4 space-y-2">
        <div className="flex items-center gap-2 text-teal-700 font-bold text-xs tracking-wider uppercase">
          <Scale className="w-4 h-4" />
          <span>{t.meta.termsTitle}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {tm.title}
        </h1>
        <p className="text-sm text-gray-600">
          {tm.subtitle}
        </p>
      </div>

      <p className="text-base text-gray-700 leading-relaxed">
        {tm.intro}
      </p>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {tm.acceptableUseTitle}
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          {tm.acceptableUseText}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {tm.userResponsibilitiesTitle}
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          {tm.userResponsibilitiesText}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {tm.availabilityTitle}
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          {tm.availabilityText}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {tm.liabilityTitle}
        </h2>
        <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-5 text-base text-gray-700 leading-relaxed">
          {tm.liabilityText}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {tm.jurisdictionTitle}
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          {tm.jurisdictionText}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {tm.contactTitle}
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          {tm.contactText}
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
