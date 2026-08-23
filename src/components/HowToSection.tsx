import React from 'react';
import { Upload, Sliders, Zap, Download } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { ToolConfig } from '../types';

interface HowToSectionProps {
  config?: ToolConfig;
}

const STEP_ICONS = [
  <Upload key="upload" className="w-4 h-4 text-teal-600 shrink-0" />,
  <Sliders key="sliders" className="w-4 h-4 text-teal-600 shrink-0" />,
  <Zap key="zap" className="w-4 h-4 text-teal-600 shrink-0" />,
  <Download key="download" className="w-4 h-4 text-teal-600 shrink-0" />,
];

export const HowToSection: React.FC<HowToSectionProps> = ({ config }) => {
  const { t } = useLocale();

  const title = t.content.howToTitle || 'How to convert AVIF to JPG';
  const steps = t.content.howToSteps || [
    {
      step: 1,
      title: 'Upload your AVIF files',
      desc: "Click 'UPLOAD FILES' or drag and drop your .avif files into the converter area.",
    },
    {
      step: 2,
      title: 'Adjust quality if desired',
      desc: 'Use the quality slider to dial in your target image quality (default 85% is ideal).',
    },
    {
      step: 3,
      title: 'Process directly in browser',
      desc: 'Your browser decodes the AVIF data and renders standard JPG pixels without server uploads.',
    },
    {
      step: 4,
      title: 'Download your JPG files',
      desc: 'Click Download on any converted image, or click DOWNLOAD ALL for a ZIP package.',
    },
  ];

  return (
    <section
      id="how-to-convert-section"
      className="w-full bg-white border border-gray-200/90 rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_2px_6px_-2px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6"
    >
      <div className="space-y-1.5 border-b border-gray-100 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2.5">
          <span className="w-2.5 h-6 bg-teal-600 rounded-full inline-block"></span>
          {title}
        </h2>
        <p className="text-sm text-gray-600 max-w-3xl">
          Follow these simple steps to convert your .avif images to high-compatibility .jpg files instantly in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <div
            key={step.step}
            id={`how-to-step-${step.step}`}
            className="bg-gray-50/90 border border-gray-200/80 rounded-xl p-5 flex flex-col justify-between space-y-3 shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:border-teal-300/80 hover:bg-teal-50/20 transition-all"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {step.step}
                </span>
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center">
                  {STEP_ICONS[index % STEP_ICONS.length]}
                </div>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-gray-900 leading-snug">
                {step.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
