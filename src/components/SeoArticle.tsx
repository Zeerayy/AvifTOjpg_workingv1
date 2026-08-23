import React, { useState } from 'react';
import { SeoContentData, ToolConfig } from '../types';
import { useLocale } from '../context/LocaleContext';
import { ChevronDown, Check, HelpCircle, ShieldCheck, Zap } from 'lucide-react';

interface SeoArticleProps {
  article: SeoContentData;
  config: ToolConfig;
}

export const SeoArticle: React.FC<SeoArticleProps> = ({ article, config }) => {
  const { t } = useLocale();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const isDefaultAvifToJpg = config.id === 'avif-to-jpg';

  return (
    <article className="w-full bg-white border border-gray-200/90 rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_2px_6px_-2px_rgba(0,0,0,0.03)] p-6 sm:p-8 md:p-10 space-y-8 text-gray-800">
      {/* Article Header & Intro */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {isDefaultAvifToJpg ? t.content.mainHeading : article.heading}
        </h2>
        <p className="text-base sm:text-[17px] leading-relaxed text-gray-700 font-normal">
          {isDefaultAvifToJpg ? t.converter.description + ' ' + t.converter.secondaryExplanation : article.intro}
        </p>
      </section>

      {/* What is AVIF & What is JPG / Target Format */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-200/85 rounded-xl p-5 sm:p-6 space-y-2.5 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)]">
          <h3 className="text-base font-bold text-gray-900 border-l-4 border-teal-600 pl-2.5">
            {isDefaultAvifToJpg ? t.content.whatIsAvifTitle : article.whatIsSource.title}
          </h3>
          <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed">
            {isDefaultAvifToJpg ? t.content.whatIsAvifBody : article.whatIsSource.body}
          </p>
        </div>

        <div className="bg-white border border-gray-200/85 rounded-xl p-5 sm:p-6 space-y-2.5 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)]">
          <h3 className="text-base font-bold text-gray-900 border-l-4 border-teal-600 pl-2.5">
            {isDefaultAvifToJpg ? t.content.whatIsJpgTitle : article.whatIsTarget.title}
          </h3>
          <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed">
            {isDefaultAvifToJpg ? t.content.whatIsJpgBody : article.whatIsTarget.body}
          </p>
        </div>
      </section>

      {/* Why Convert */}
      <section className="space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 border-l-4 border-teal-600 pl-2.5">
          {isDefaultAvifToJpg ? t.content.whyConvertTitle : article.whyConvert.title}
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {(isDefaultAvifToJpg ? t.content.whyConvertPoints : article.whyConvert.points).map(
            (point, index) => {
              const [boldPart, ...rest] = point.split(':');
              return (
                <div
                  key={index}
                  className="flex items-start gap-3.5 bg-gray-50/90 p-3.5 sm:p-4 rounded-xl border border-gray-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                >
                  <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 border border-teal-300">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div className="text-sm sm:text-base text-gray-800 leading-relaxed">
                    {rest.length > 0 ? (
                      <>
                        <strong className="text-gray-950 font-semibold">{boldPart}:</strong>
                        {rest.join(':')}
                      </>
                    ) : (
                      point
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 border-l-4 border-teal-600 pl-2.5">
          {isDefaultAvifToJpg ? t.content.comparisonTitle : article.comparison.title}
        </h3>
        <div className="overflow-x-auto border border-gray-200/80 rounded-xl shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] overflow-hidden">
          <table className="w-full text-left text-sm sm:text-base border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-gray-800">
                <th className="py-3.5 px-4 font-bold">Feature / Metric</th>
                <th className="py-3.5 px-4 font-bold text-teal-900 bg-teal-50/70">
                  AVIF
                </th>
                <th className="py-3.5 px-4 font-bold text-gray-900">
                  {config.outputFormatName}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {isDefaultAvifToJpg
                ? t.content.comparisonRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}
                    >
                      <td className="py-3.5 px-4 font-semibold text-gray-900">
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-4 text-teal-950 bg-teal-50/40 font-medium">
                        {row.avif}
                      </td>
                      <td className="py-3.5 px-4 text-gray-700">
                        {row.jpg}
                      </td>
                    </tr>
                  ))
                : article.comparison.rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}
                    >
                      <td className="py-3.5 px-4 font-semibold text-gray-900">
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-4 text-teal-950 bg-teal-50/40 font-medium">
                        {row.avif}
                      </td>
                      <td className="py-3.5 px-4 text-gray-700">
                        {row.other}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quality Explanation & In-browser Architecture if AVIF-to-JPG */}
      {isDefaultAvifToJpg && (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white border border-gray-200/85 rounded-xl p-5 sm:p-6 space-y-2.5 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)]">
            <h3 className="text-base font-bold text-gray-900 border-l-4 border-teal-600 pl-2.5">
              {t.content.qualityExplainedTitle}
            </h3>
            <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed">
              {t.content.qualityExplainedBody}
            </p>
          </div>
          <div className="bg-white border border-gray-200/85 rounded-xl p-5 sm:p-6 space-y-2.5 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)]">
            <h3 className="text-base font-bold text-gray-900 border-l-4 border-teal-600 pl-2.5">
              {t.content.areFilesUploadedTitle}
            </h3>
            <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed">
              {t.content.areFilesUploadedBody}
            </p>
          </div>
        </section>
      )}

      {/* Trust & Privacy Pillars */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 sm:p-6 bg-teal-50/70 rounded-xl border border-teal-200/90 shadow-[0_2px_12px_-2px_rgba(13,148,136,0.12)] text-sm">
        <div className="flex items-start gap-3.5">
          <ShieldCheck className="w-6 h-6 text-teal-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-teal-950 text-base">
              {isDefaultAvifToJpg ? t.content.areFilesUploadedTitle : '100% Private Client-Side Execution'}
            </h4>
            <p className="text-teal-900 text-sm sm:text-[15px] leading-relaxed">
              {isDefaultAvifToJpg ? t.content.areFilesUploadedBody : 'Your files never leave your computer or phone. All image transcoding happens directly inside your browser.'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <Zap className="w-6 h-6 text-teal-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-teal-950 text-base">
              {isDefaultAvifToJpg ? t.content.isFreeTitle : 'Completely Free & Limitless'}
            </h4>
            <p className="text-teal-900 text-sm sm:text-[15px] leading-relaxed">
              {isDefaultAvifToJpg ? t.content.isFreeBody : 'No hidden fees, no subscriptions, and no email registration. Convert as many files as you need with high processing speed.'}
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-teal-600" />
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            {isDefaultAvifToJpg ? t.faq.heading : 'Frequently Asked Questions'}
          </h3>
        </div>

        <div className="space-y-3">
          {(isDefaultAvifToJpg ? t.faq.items : article.faqs).map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-200/80 rounded-xl overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 sm:p-4.5 bg-gray-50/90 hover:bg-gray-100/90 font-semibold text-sm sm:text-base text-gray-900 flex items-center justify-between gap-3 cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-teal-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 bg-white text-sm sm:text-base text-gray-700 leading-relaxed border-t border-gray-200/80">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
};
