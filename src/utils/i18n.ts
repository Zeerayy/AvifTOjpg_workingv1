import en from '../locales/en.json';

export type SupportedLocale =
  | 'en'
  | 'ru'
  | 'de'
  | 'zh'
  | 'es'
  | 'pt'
  | 'id'
  | 'fr'
  | 'ja'
  | 'nl'
  | 'pl'
  | 'tr'
  | 'ko'
  | 'it'
  | 'vi'
  | 'hi';

export interface LocaleData {
  langCode: string;
  langName: string;
  nativeName: string;
  meta: {
    pageTitle: string;
    metaDescription: string;
    privacyTitle: string;
    privacyDescription: string;
    termsTitle: string;
    termsDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    contactTitle: string;
    contactDescription: string;
  };
  header: {
    brand: string;
    language: string;
  };
  ad: {
    label: string;
    topSlot: string;
    sidebarSlot: string;
    midContentSlot: string;
  };
  converter: {
    title: string;
    description: string;
    secondaryExplanation: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    qualityLabel: string;
    qualityHelp: string;
    dropZoneTitle: string;
    dropZoneSubtitle: string;
    uploadButton: string;
    dropZoneNote: string;
    privacyNotice: string;
    privacyLink: string;
    queueTitle: string;
    statusWaiting: string;
    statusConverting: string;
    statusConverted: string;
    statusError: string;
    btnDownload: string;
    btnDownloadAll: string;
    btnClearQueue: string;
    btnTrySample: string;
    unsupportedBrowser: string;
    invalidFileType: string;
    originalSize: string;
    convertedSize: string;
  };
  content: {
    mainHeading: string;
    whatIsAvifTitle: string;
    whatIsAvifTeaser?: string;
    whatIsAvifBody: string;
    whatIsJpgTitle: string;
    whatIsJpgBody: string;
    whyConvertTitle: string;
    whyConvertTeaser?: string;
    whyConvertPoints: string[];
    comparisonTitle: string;
    comparisonRows: Array<{
      feature: string;
      avif: string;
      jpg: string;
    }>;
    howToTitle: string;
    howToSteps: Array<{
      step: number;
      title: string;
      desc: string;
    }>;
    qualityExplainedTitle: string;
    qualityExplainedBody: string;
    areFilesUploadedTitle: string;
    areFilesUploadedBody: string;
    isFreeTitle: string;
    isFreeBody: string;
  };
  faq: {
    heading: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  footer: {
    brand: string;
    tagline: string;
    navHome: string;
    navPrivacy: string;
    navTerms: string;
    navAbout: string;
    navContact: string;
    copyright: string;
  };
  pages: {
    privacy: {
      title: string;
      subtitle: string;
      intro: string;
      fileProcessingTitle: string;
      fileProcessingText: string;
      dataCollectionTitle: string;
      dataCollectionText: string;
      cookiesTitle: string;
      cookiesText: string;
      thirdPartyTitle: string;
      thirdPartyText: string;
      rightsTitle: string;
      rightsText: string;
      contactTitle: string;
      contactText: string;
    };
    terms: {
      title: string;
      subtitle: string;
      intro: string;
      acceptableUseTitle: string;
      acceptableUseText: string;
      userResponsibilitiesTitle: string;
      userResponsibilitiesText: string;
      availabilityTitle: string;
      availabilityText: string;
      liabilityTitle: string;
      liabilityText: string;
      jurisdictionTitle: string;
      jurisdictionText: string;
      contactTitle: string;
      contactText: string;
    };
    about: {
      title: string;
      subtitle: string;
      missionTitle: string;
      missionText: string;
      whyAvifTitle: string;
      whyAvifText: string;
      howItWorksTitle: string;
      howItWorksText: string;
      futureDirectionTitle: string;
      futureDirectionText: string;
    };
    contact: {
      title: string;
      subtitle: string;
      intro: string;
      emailLabel: string;
      emailAddress: string;
      emailDesc: string;
      responseTime: string;
      noteTitle: string;
      noteText: string;
    };
  };
}

export const DEFAULT_LOCALE_DATA: LocaleData = en as LocaleData;

const localeLoaders: Record<SupportedLocale, () => Promise<{ default: LocaleData }>> = {
  en: () => Promise.resolve({ default: DEFAULT_LOCALE_DATA }),
  ru: () => import('../locales/ru.json') as Promise<{ default: LocaleData }>,
  de: () => import('../locales/de.json') as Promise<{ default: LocaleData }>,
  zh: () => import('../locales/zh.json') as Promise<{ default: LocaleData }>,
  es: () => import('../locales/es.json') as Promise<{ default: LocaleData }>,
  pt: () => import('../locales/pt.json') as Promise<{ default: LocaleData }>,
  id: () => import('../locales/id.json') as Promise<{ default: LocaleData }>,
  fr: () => import('../locales/fr.json') as Promise<{ default: LocaleData }>,
  ja: () => import('../locales/ja.json') as Promise<{ default: LocaleData }>,
  nl: () => import('../locales/nl.json') as Promise<{ default: LocaleData }>,
  pl: () => import('../locales/pl.json') as Promise<{ default: LocaleData }>,
  tr: () => import('../locales/tr.json') as Promise<{ default: LocaleData }>,
  ko: () => import('../locales/ko.json') as Promise<{ default: LocaleData }>,
  it: () => import('../locales/it.json') as Promise<{ default: LocaleData }>,
  vi: () => import('../locales/vi.json') as Promise<{ default: LocaleData }>,
  hi: () => import('../locales/hi.json') as Promise<{ default: LocaleData }>,
};

const localeCache: Partial<Record<SupportedLocale, LocaleData>> = {
  en: DEFAULT_LOCALE_DATA,
};

export async function loadLocale(locale: SupportedLocale): Promise<LocaleData> {
  if (localeCache[locale]) {
    return localeCache[locale]!;
  }
  if (!localeLoaders[locale]) {
    return DEFAULT_LOCALE_DATA;
  }
  try {
    const module = await localeLoaders[locale]();
    const data = module.default;
    localeCache[locale] = data;
    return data;
  } catch (error) {
    console.error(`Error loading locale "${locale}":`, error);
    return DEFAULT_LOCALE_DATA;
  }
}

export interface LanguageOption {
  code: SupportedLocale;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'zh', name: 'Chinese', nativeName: '简体中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
];

export const SUPPORTED_LOCALE_CODES: SupportedLocale[] = [
  'en',
  'es',
  'de',
  'fr',
  'pt',
  'it',
  'nl',
  'pl',
  'ru',
  'tr',
  'zh',
  'ja',
  'ko',
  'vi',
  'id',
  'hi',
];

export function isValidLocale(code: string | undefined | null): code is SupportedLocale {
  return typeof code === 'string' && (SUPPORTED_LOCALE_CODES as string[]).includes(code);
}

const STORAGE_KEY = 'avif_to_jpg_lang';

export function getInitialLocale(): SupportedLocale {
  try {
    // 1. Check URL search param (?lang=es or ?hl=es)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = (params.get('lang') || params.get('hl'))?.toLowerCase();
      if (isValidLocale(urlLang)) {
        return urlLang;
      }

      // 2. Check localStorage
      const saved = localStorage.getItem(STORAGE_KEY)?.toLowerCase();
      if (isValidLocale(saved)) {
        return saved;
      }

      // 3. Check browser language (e.g. "zh-CN" -> "zh", "pt-BR" -> "pt")
      const browserLang = navigator.language?.slice(0, 2).toLowerCase();
      if (isValidLocale(browserLang)) {
        return browserLang;
      }
    }
  } catch (e) {
    // fallback safely
  }
  return 'en';
}

export function saveLocale(locale: SupportedLocale): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, locale);
    }
  } catch (e) {
    // ignore
  }
}

