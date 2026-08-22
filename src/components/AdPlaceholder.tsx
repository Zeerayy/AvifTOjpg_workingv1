import React from 'react';

interface AdPlaceholderProps {
  type?: 'sidebar' | 'banner' | 'responsive';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = () => {
  // Ad slots are hidden
  return null;
};

