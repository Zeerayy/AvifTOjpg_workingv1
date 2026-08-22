import en from '../locales/en.json';
import ru from '../locales/ru.json';
import de from '../locales/de.json';
import zh from '../locales/zh.json';
import es from '../locales/es.json';
import pt from '../locales/pt.json';
import id from '../locales/id.json';
import fr from '../locales/fr.json';
import ja from '../locales/ja.json';
import nl from '../locales/nl.json';
import pl from '../locales/pl.json';
import tr from '../locales/tr.json';
import ko from '../locales/ko.json';
import it from '../locales/it.json';
import vi from '../locales/vi.json';
import hi from '../locales/hi.json';

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
    whatIsAvifBody: string;
    whatIsJpgTitle: string;
    whatIsJpgBody: string;
    whyConvertTitle: string;
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

export const LOCALES: Record<SupportedLocale, LocaleData> = {
  en: en as LocaleData,
  ru: ru as LocaleData,
  de: de as LocaleData,
  zh: zh as LocaleData,
  es: es as LocaleData,
  pt: pt as LocaleData,
  id: id as LocaleData,
  fr: fr as LocaleData,
  ja: ja as LocaleData,
  nl: nl as LocaleData,
  pl: pl as LocaleData,
  tr: tr as LocaleData,
  ko: ko as LocaleData,
  it: it as LocaleData,
  vi: vi as LocaleData,
  hi: hi as LocaleData,
};

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

const STORAGE_KEY = 'avif_to_jpg_lang';

export function getInitialLocale(): SupportedLocale {
  try {
    // 1. Check URL search param (?lang=es or ?hl=es)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = (params.get('lang') || params.get('hl'))?.toLowerCase();
      if (urlLang && urlLang in LOCALES) {
        return urlLang as SupportedLocale;
      }

      // 2. Check localStorage
      const saved = localStorage.getItem(STORAGE_KEY)?.toLowerCase();
      if (saved && saved in LOCALES) {
        return saved as SupportedLocale;
      }

      // 3. Check browser language (e.g. "zh-CN" -> "zh", "pt-BR" -> "pt")
      const browserLang = navigator.language?.slice(0, 2).toLowerCase();
      if (browserLang && browserLang in LOCALES) {
        return browserLang as SupportedLocale;
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

export function getLocale(code: string): LocaleData {
  if (code in LOCALES) {
    return LOCALES[code as SupportedLocale];
  }
  return LOCALES.en;
}
