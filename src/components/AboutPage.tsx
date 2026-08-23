import React from 'react';
import { PageId } from '../types';
import { useLocale } from '../context/LocaleContext';
import { Info, Sparkles, ShieldCheck, Zap, ArrowLeft } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { t } = useLocale();
  const ab = t.pages.about;

  return (
    <div className="w-full bg-white border border-gray-200/90 rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_2px_6px_-2px_rgba(0,0,0,0.03)] p-6 sm:p-8 md:p-10 space-y-7 text-gray-800">
      <div className="border-b border-gray-100 pb-4 space-y-2">
        <div className="flex items-center gap-2 text-teal-700 font-bold text-xs tracking-wider uppercase">
          <Info className="w-4 h-4" />
          <span>{t.meta.aboutTitle}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {ab.title}
        </h1>
        <p className="text-sm text-gray-600">
          {ab.subtitle}
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {ab.missionTitle}
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          {ab.missionText}
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-50/90 border border-gray-200/80 rounded-xl p-5 space-y-2.5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)]">
          <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm sm:text-base text-gray-900">
            {t.content.areFilesUploadedTitle}
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {t.content.areFilesUploadedBody}
          </p>
        </div>

        <div className="bg-gray-50/90 border border-gray-200/80 rounded-xl p-5 space-y-2.5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)]">
          <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm sm:text-base text-gray-900">
            {ab.howItWorksTitle}
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {ab.howItWorksText}
          </p>
        </div>

        <div className="bg-gray-50/90 border border-gray-200/80 rounded-xl p-5 space-y-2.5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)]">
          <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm sm:text-base text-gray-900">
            {t.content.isFreeTitle}
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {t.content.isFreeBody}
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {ab.whyAvifTitle}
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          {ab.whyAvifText}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {ab.futureDirectionTitle}
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          {ab.futureDirectionText}
        </p>
      </section>

      <div className="pt-4 border-t border-gray-100 flex justify-start">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('avif-to-jpg');
          }}
          className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.footer.navHome}</span>
        </a>
      </div>
    </div>
  );
};
