import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SupportedLocale,
  LocaleData,
  LOCALES,
  SUPPORTED_LANGUAGES,
  LanguageOption,
  getInitialLocale,
  saveLocale,
} from '../utils/i18n';

interface LocaleContextType {
  locale: SupportedLocale;
  t: LocaleData;
  setLocale: (locale: SupportedLocale) => void;
  languages: LanguageOption[];
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(getInitialLocale);

  const setLocale = (newLocale: SupportedLocale) => {
    if (newLocale in LOCALES) {
      setLocaleState(newLocale);
      saveLocale(newLocale);
      // Sync html lang attribute
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLocale;
      }
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const t = LOCALES[locale] || LOCALES.en;

  return (
    <LocaleContext.Provider
      value={{
        locale,
        t,
        setLocale,
        languages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export function useLocale(): LocaleContextType {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
