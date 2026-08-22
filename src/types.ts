export type ConvertFormat = 'jpg' | 'jpeg';

export type ConversionStatus = 'queued' | 'processing' | 'done' | 'error';

export interface ConversionItem {
  id: string;
  file: File;
  originalName: string;
  originalSize: number;
  originalDimensions?: { width: number; height: number };
  previewUrl: string;
  status: ConversionStatus;
  progress: number;
  convertedBlob?: Blob;
  convertedUrl?: string;
  convertedSize?: number;
  convertedDimensions?: { width: number; height: number };
  errorMessage?: string;
  outputFormat: ConvertFormat;
}

export type ToolMode = 'avif-to-jpg';

export type PageId = 'avif-to-jpg' | 'privacy' | 'terms' | 'about' | 'contact';

export interface ToolConfig {
  id: ToolMode;
  path: string;
  title: string;
  navLabel: string;
  inputFormatName: string;
  outputFormatName: string;
  outputFormat: ConvertFormat;
  acceptedExtensions: string[];
  acceptedMimeTypes: string[];
  description: string;
  step1Text: string;
  step2Text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ComparisonRow {
  feature: string;
  avif: string;
  jpg: string;
}

export interface SeoContentData {
  pageTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  whatIsSource: { title: string; body: string };
  whatIsTarget: { title: string; body: string };
  whyConvert: { title: string; points: string[] };
  comparison: {
    title: string;
    rows: ComparisonRow[];
  };
  howToSteps: { step: number; title: string; desc: string }[];
  faqs: FaqItem[];
}
