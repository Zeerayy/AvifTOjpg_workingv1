import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SupportedLocale,
  LocaleData,
  DEFAULT_LOCALE_DATA,
  SUPPORTED_LANGUAGES,
  LanguageOption,
  getInitialLocale,
  saveLocale,
  loadLocale,
  isValidLocale,
} from '../utils/i18n';

interface LocaleContextType {
  locale: SupportedLocale;
  t: LocaleData;
  setLocale: (locale: SupportedLocale) => void;
  languages: LanguageOption[];
  isLoadingLocale: boolean;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(getInitialLocale);
  const [t, setT] = useState<LocaleData>(DEFAULT_LOCALE_DATA);
  const [isLoadingLocale, setIsLoadingLocale] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const fetchLocaleData = async () => {
      if (locale === 'en') {
        setT(DEFAULT_LOCALE_DATA);
        return;
      }
      setIsLoadingLocale(true);
      try {
        const data = await loadLocale(locale);
        if (isMounted && data) {
          setT(data);
        }
      } catch (err) {
        console.error(`Failed to load locale '${locale}':`, err);
      } finally {
        if (isMounted) {
          setIsLoadingLocale(false);
        }
      }
    };

    fetchLocaleData();

    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }

    return () => {
      isMounted = false;
    };
  }, [locale]);

  const setLocale = (newLocale: SupportedLocale) => {
    if (isValidLocale(newLocale)) {
      setLocaleState(newLocale);
      saveLocale(newLocale);
    }
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        t,
        setLocale,
        languages: SUPPORTED_LANGUAGES,
        isLoadingLocale,
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
