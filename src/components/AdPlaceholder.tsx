import React from 'react';
import { useLocale } from '../context/LocaleContext';

interface AdPlaceholderProps {
  type?: 'sidebar' | 'banner' | 'responsive';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  type = 'sidebar',
  className = '',
}) => {
  const { t } = useLocale();

  if (type === 'sidebar') {
    return (
      <aside
        id="ad-sidebar-container"
        className={`w-full bg-gray-200 border border-dashed border-gray-300 rounded-lg flex items-center justify-center min-h-[300px] relative overflow-hidden select-none ${className}`}
        aria-label={t.ad.label}
      >
        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest absolute top-2 left-2">
          {t.ad.label}
        </span>
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2 opacity-50 flex items-center justify-center text-gray-400 text-xs font-bold">
            Ad
          </div>
          <p className="text-xs text-gray-400">
            {t.ad.sidebarSlot}
          </p>
        </div>
      </aside>
    );
  }

  return (
    <div
      id="ad-banner-container"
      className={`w-full bg-gray-100 border border-dashed border-gray-300 rounded-lg p-3 text-center flex flex-col items-center justify-center min-h-[90px] relative select-none ${className}`}
      aria-label={t.ad.label}
    >
      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest absolute top-2 left-3">
        {t.ad.label}
      </span>
      <div className="w-full flex items-center justify-center py-2 px-4 text-gray-400">
        <span className="text-xs font-medium text-gray-500">
          {t.ad.topSlot}
        </span>
      </div>
    </div>
  );
};
