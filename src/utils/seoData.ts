import { ToolConfig, ToolMode, SeoContentData } from '../types';

export const TOOL_CONFIGS: Record<ToolMode, ToolConfig> = {
  'avif-to-jpg': {
    id: 'avif-to-jpg',
    path: '/',
    title: 'AVIF to JPG Converter',
    navLabel: 'AVIF to JPG',
    inputFormatName: 'AVIF',
    outputFormatName: 'JPG',
    outputFormat: 'jpg',
    acceptedExtensions: ['.avif'],
    acceptedMimeTypes: ['image/avif'],
    description:
      'Convert AVIF images to JPG format quickly and easily. Your images are processed directly in your browser, so your files do not need to be uploaded to a server.',
    step1Text: 'Upload your AVIF files by clicking the upload button or dragging and dropping images into the box.',
    step2Text: 'Download your converted JPG files instantly as individual images or grouped as a ZIP archive.',
  },
};

export const SEO_ARTICLES: Record<ToolMode, SeoContentData> = {
  'avif-to-jpg': {
    pageTitle: 'AVIF to JPG Converter – Free Online Image Converter',
    metaDescription:
      'Convert AVIF images to JPG format quickly and easily. Process images directly in your browser with our free, private AVIF to JPG converter.',
    heading: 'AVIF to JPG Converter',
    intro:
      'Easily transform AVIF (AV1 Image File Format) photos and graphics into universal JPG (JPEG) format in seconds. Experience fast, 100% private in-browser conversion with custom quality controls and zero server uploads.',
    whatIsSource: {
      title: 'What is AVIF?',
      body: 'AVIF (AV1 Image File Format) is an open, royalty-free image format developed by the Alliance for Open Media (AOMedia). Leveraging the AV1 video codec, AVIF provides superior compression efficiency compared to older formats like JPEG and PNG, making files significantly smaller while preserving pristine image fidelity.',
    },
    whatIsTarget: {
      title: 'What is JPG?',
      body: 'JPG (or JPEG) is the most globally recognized and universally compatible digital image format. Created by the Joint Photographic Experts Group, it is supported by virtually every web browser, operating system, image editor, mobile phone, and digital printer in existence.',
    },
    whyConvert: {
      title: 'Why Convert AVIF to JPG?',
      points: [
        'Universal Device Compatibility: Many older software packages, photo editors, and legacy operating systems cannot natively open or edit AVIF files.',
        'Social Media & Website Uploads: Many social media networks, CMS platforms, and online marketplaces still restrict image uploads to standard JPG and PNG files.',
        'Seamless Photo Printing: Commercial photo printing services, kiosks, and print shops standardly expect JPG files.',
        'Effortless Sharing: Sending a JPG ensures the recipient can open and view the image immediately without requiring specialized codecs or modern browser updates.',
      ],
    },
    comparison: {
      title: 'AVIF vs. JPG Format Comparison',
      rows: [
        {
          feature: 'Compression Efficiency',
          avif: 'Superior (up to 50% smaller files)',
          jpg: 'Standard baseline compression',
        },
        {
          feature: 'Global Compatibility',
          avif: 'Modern web browsers & recent OS',
          jpg: '100% supported on all devices & platforms',
        },
        {
          feature: 'Transparency (Alpha)',
          avif: 'Supported',
          jpg: 'Not supported',
        },
        {
          feature: 'Color Depth & HDR',
          avif: '8, 10, 12-bit HDR wide gamut',
          jpg: 'Standard 8-bit SDR',
        },
        {
          feature: 'Animation Support',
          avif: 'Supported (animated AVIF)',
          jpg: 'Not supported (static images only)',
        },
        {
          feature: 'Hardware Acceleration',
          avif: 'Modern chips with AV1 decoders',
          jpg: 'Universal hardware decoding everywhere',
        },
      ],
    },
    howToSteps: [
      {
        step: 1,
        title: 'Upload AVIF Files',
        desc: "Click the 'Upload Files' button or drag and drop your .avif image files directly into the conversion zone.",
      },
      {
        step: 2,
        title: 'Adjust Image Quality',
        desc: 'Customize the output quality percentage slider (default 85% offers an optimal balance between quality and file size).',
      },
      {
        step: 3,
        title: 'Automatic In-Browser Processing',
        desc: 'Your browser instantly decodes and converts the AVIF images locally on your device in real-time.',
      },
      {
        step: 4,
        title: 'Download Your JPG Files',
        desc: "Click 'Download' on individual images or click 'Download All (ZIP)' to save all converted JPG images at once.",
      },
    ],
    faqs: [
      {
        question: 'What is AVIF?',
        answer:
          'AVIF (AV1 Image File Format) is a modern image compression format based on the AV1 video codec that provides high image quality at much smaller file sizes than traditional JPEG.',
      },
      {
        question: 'What is JPG?',
        answer:
          'JPG (or JPEG) is the standard digital photographic image format used worldwide across virtually every device, website, and operating system.',
      },
      {
        question: 'Why should I convert AVIF to JPG?',
        answer:
          'Converting AVIF to JPG ensures maximum compatibility with older software, photo editors, operating systems, printing services, and platforms that do not yet support the newer AVIF format.',
      },
      {
        question: 'Is this AVIF to JPG converter completely free?',
        answer:
          'Yes, AVIFtoJPG.in is 100% free with no registration, no watermarks, and no limits on the number of conversions.',
      },
      {
        question: 'Are my images uploaded to your servers?',
        answer:
          'No! All conversions occur 100% locally inside your web browser using HTML5 Canvas APIs. Your files never leave your device.',
      },
      {
        question: 'Will converting AVIF to JPG reduce image quality?',
        answer:
          'At the default 85%–90% quality setting, visual degradation is virtually imperceptible to the human eye while keeping file size efficient.',
      },
      {
        question: 'Can I convert multiple AVIF files at once?',
        answer:
          'Yes, you can select or drag multiple AVIF files and convert them simultaneously, then download them individually or as a single ZIP archive.',
      },
      {
        question: 'Does this converter work on mobile phones?',
        answer:
          'Yes, AVIFtoJPG.in works smoothly on all modern mobile browsers on both Android and iOS devices.',
      },
      {
        question: 'What quality setting should I choose?',
        answer:
          '85% is recommended for everyday web and photo sharing. For professional high-resolution printing, consider 90%–95%.',
      },
      {
        question: 'Why does my Windows or Mac computer fail to open AVIF files?',
        answer:
          'Older operating system versions lack built-in AVIF codecs. Converting your AVIF files to standard JPG resolves this incompatibility instantly.',
      },
    ],
  },
};
