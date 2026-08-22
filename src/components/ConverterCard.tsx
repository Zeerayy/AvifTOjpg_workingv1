import React, { useState, useRef, useEffect, useId } from 'react';
import JSZip from 'jszip';
import {
  ToolConfig,
  ConversionItem,
  PageId,
} from '../types';
import {
  convertImageInBrowser,
  formatBytes,
  getFileExtension,
  createSampleAvifOrImageFile,
} from '../utils/imageConverter';
import { useLocale } from '../context/LocaleContext';
import {
  Upload,
  Download,
  FileArchive,
  AlertCircle,
  Loader2,
  Sparkles,
  FileImage,
} from 'lucide-react';

interface ConverterCardProps {
  config: ToolConfig;
  onNavigate: (page: PageId) => void;
}

export const ConverterCard: React.FC<ConverterCardProps> = ({
  config,
  onNavigate,
}) => {
  const { t } = useLocale();
  const [quality, setQuality] = useState<number>(85);
  const [queue, setQueue] = useState<ConversionItem[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const qualitySliderId = useId();

  // When config changes, clear errors
  useEffect(() => {
    setGeneralError(null);
  }, [config.id]);

  // Clean up object URLs when unmounting or clearing
  useEffect(() => {
    return () => {
      queue.forEach((item) => {
        if (item.previewUrl && item.previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(item.previewUrl);
        }
        if (item.convertedUrl && item.convertedUrl.startsWith('blob:')) {
          URL.revokeObjectURL(item.convertedUrl);
        }
      });
    };
  }, [queue]);

  const handleFilesSelected = async (fileList: FileList | File[]) => {
    setGeneralError(null);
    const files = Array.from(fileList);
    if (files.length === 0) return;

    // Filter valid files based on accepted extensions and MIME types
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    files.forEach((f) => {
      const ext = '.' + (f.name.split('.').pop() || '').toLowerCase();
      const isExtValid = config.acceptedExtensions.some(
        (accepted) => accepted.toLowerCase() === ext
      );
      const isMimeValid = config.acceptedMimeTypes.some(
        (accepted) => f.type && f.type.toLowerCase().includes(accepted.replace('image/', ''))
      );

      if (isExtValid || isMimeValid || f.type.startsWith('image/')) {
        validFiles.push(f);
      } else {
        invalidFiles.push(f.name);
      }
    });

    if (invalidFiles.length > 0 && validFiles.length === 0) {
      setGeneralError(
        t.converter.invalidFileType || `Unsupported file type. Please upload ${config.acceptedExtensions.join(' or ')} files.`
      );
      return;
    }

    setIsProcessing(true);

    // Initial placeholder items
    const newItems: ConversionItem[] = validFiles.map((f) => ({
      id: Math.random().toString(36).substring(2, 9),
      file: f,
      originalName: f.name,
      originalSize: f.size,
      previewUrl: URL.createObjectURL(f),
      status: 'processing',
      progress: 30,
      outputFormat: config.outputFormat,
    }));

    setQueue((prev) => [...prev, ...newItems]);

    // Process each item
    for (let i = 0; i < newItems.length; i++) {
      const placeholder = newItems[i];
      const targetFile = validFiles[i];

      try {
        const result = await convertImageInBrowser(
          targetFile,
          config.outputFormat,
          quality
        );

        setQueue((prev) =>
          prev.map((item) =>
            item.id === placeholder.id
              ? {
                  ...item,
                  status: 'done',
                  progress: 100,
                  convertedBlob: result.blob,
                  convertedUrl: result.dataUrl,
                  convertedSize: result.blob.size,
                  convertedDimensions: {
                    width: result.width,
                    height: result.height,
                  },
                }
              : item
          )
        );
      } catch (err: any) {
        setQueue((prev) =>
          prev.map((item) =>
            item.id === placeholder.id
              ? {
                  ...item,
                  status: 'error',
                  progress: 0,
                  errorMessage:
                    err?.message ||
                    t.converter.statusError ||
                    'Could not decode this image.',
                }
              : item
          )
        );
      }
    }

    setIsProcessing(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(e.dataTransfer.files);
    }
  };

  const handleClearQueue = () => {
    queue.forEach((item) => {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
    });
    setQueue([]);
    setGeneralError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLoadSample = async () => {
    setGeneralError(null);
    try {
      const sampleFile = await createSampleAvifOrImageFile(
        `sample-photo${config.acceptedExtensions[0] || '.avif'}`,
        `${config.inputFormatName} Sample`,
        `Converting to ${config.outputFormatName}`
      );
      handleFilesSelected([sampleFile]);
    } catch (err) {
      setGeneralError('Could not generate sample image in this browser session.');
    }
  };

  const downloadSingle = (item: ConversionItem) => {
    if (!item.convertedBlob || !item.convertedUrl) return;

    const baseName = item.originalName.replace(/\.[^/.]+$/, '');
    const outExt = getFileExtension(item.outputFormat);
    const downloadFilename = `${baseName}${outExt}`;

    const link = document.createElement('a');
    link.href = item.convertedUrl;
    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllZip = async () => {
    const completedItems = queue.filter(
      (item) => item.status === 'done' && item.convertedBlob
    );

    if (completedItems.length === 0) return;

    if (completedItems.length === 1) {
      downloadSingle(completedItems[0]);
      return;
    }

    setIsZipping(true);

    try {
      const zip = new JSZip();
      const usedNames = new Set<string>();

      completedItems.forEach((item) => {
        if (!item.convertedBlob) return;
        const baseName = item.originalName.replace(/\.[^/.]+$/, '');
        const outExt = getFileExtension(item.outputFormat);
        let finalName = `${baseName}${outExt}`;

        let counter = 1;
        while (usedNames.has(finalName)) {
          finalName = `${baseName}_${counter}${outExt}`;
          counter++;
        }
        usedNames.add(finalName);

        zip.file(finalName, item.convertedBlob);
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = zipUrl;
      link.download = `converted_${config.outputFormatName.toLowerCase()}_images.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(zipUrl), 3000);
    } catch (err) {
      setGeneralError('Failed to generate ZIP archive. You can download individual files.');
    } finally {
      setIsZipping(false);
    }
  };

  const completedCount = queue.filter((i) => i.status === 'done').length;

  // Localized card title & description
  const isDefaultAvifToJpg = config.id === 'avif-to-jpg';
  const cardTitle = isDefaultAvifToJpg ? t.converter.title : config.title;
  const cardDesc = isDefaultAvifToJpg ? t.converter.description : config.description;

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm flex flex-col gap-6">
      {/* Converter Heading & Introduction */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2.5 tracking-tight">
          {cardTitle}
        </h1>
        <p className="text-base sm:text-[17px] text-gray-700 leading-relaxed font-normal">
          {cardDesc} {t.converter.secondaryExplanation}
        </p>
      </div>

      {/* Drag & Drop Area */}
      <div
        id="drop-zone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 sm:p-10 flex flex-col items-center justify-center cursor-pointer transition-colors select-none ${
          isDragging
            ? 'border-teal-500 bg-teal-50 scale-[1.005]'
            : 'border-teal-300 bg-teal-50/40 hover:border-teal-500 hover:bg-teal-50/70'
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        aria-label={`${t.converter.dropZoneTitle} ${t.converter.dropZoneSubtitle}`}
      >
        <Upload className="w-12 h-12 text-teal-600 mb-3.5" />
        <p className="text-lg sm:text-xl font-bold text-gray-900">
          {isDefaultAvifToJpg
            ? t.converter.dropZoneTitle
            : `Drop Your ${config.inputFormatName} Files Here`}
        </p>
        <p className="text-sm sm:text-base text-gray-600 mt-1 font-medium">
          {t.converter.dropZoneSubtitle}
        </p>
        <div className="text-xs sm:text-sm text-gray-500 pt-2.5 font-medium">
          {isDefaultAvifToJpg
            ? t.converter.dropZoneNote
            : `Accepts ${config.acceptedExtensions.join(', ')} • Multiple files supported`}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={config.acceptedExtensions.join(',') + ',' + config.acceptedMimeTypes.join(',')}
        onChange={(e) => {
          if (e.target.files) {
            handleFilesSelected(e.target.files);
          }
        }}
        className="hidden"
        aria-hidden="true"
      />

      {/* Conversion Queue List */}
      {queue.length > 0 && (
        <div className="space-y-3 overflow-y-auto max-h-[320px] pr-1">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">
            <span>{t.converter.queueTitle} ({queue.length})</span>
            <span>Status</span>
          </div>

          <div className="space-y-2.5">
            {queue.map((item) => {
              const isDone = item.status === 'done';
              const isError = item.status === 'error';
              const isProcessingItem = item.status === 'processing';
              const sizeReduction =
                item.convertedSize && item.originalSize
                  ? Math.round(
                      ((item.originalSize - item.convertedSize) / item.originalSize) *
                        100
                    )
                  : 0;

              return (
                <div
                  key={item.id}
                  id={`queue-item-${item.id}`}
                  className="flex items-center justify-between p-3.5 bg-gray-50 rounded border border-gray-100 gap-3"
                >
                  {/* Left: Thumbnail & File Metadata */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Thumbnail preview */}
                    <div className="w-11 h-11 rounded bg-white border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center relative">
                      {item.convertedUrl || item.previewUrl ? (
                        <img
                          src={item.convertedUrl || item.previewUrl}
                          alt={item.originalName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FileImage className="w-5 h-5 text-gray-400" />
                      )}
                      {isDone && (
                        <div className="absolute bottom-0 right-0 bg-teal-600 text-[8px] text-white font-bold px-1">
                          {config.outputFormatName}
                        </div>
                      )}
                    </div>

                    {/* File details */}
                    <div className="flex flex-col min-w-0">
                      <span
                        className="text-sm font-medium text-gray-800 truncate max-w-[180px] sm:max-w-[240px]"
                        title={item.originalName}
                      >
                        {item.originalName}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <span className="uppercase tracking-wider">{formatBytes(item.originalSize)}</span>
                        {isDone && item.convertedSize && (
                          <>
                            <span>→</span>
                            <span className="font-semibold text-gray-700">
                              {formatBytes(item.convertedSize)}
                            </span>
                            {sizeReduction > 0 ? (
                              <span className="text-emerald-600 font-medium">
                                (-{sizeReduction}%)
                              </span>
                            ) : sizeReduction < 0 ? (
                              <span className="text-gray-500 font-medium">
                                (+{Math.abs(sizeReduction)}%)
                              </span>
                            ) : null}
                          </>
                        )}
                      </div>

                      {/* Error text */}
                      {isError && item.errorMessage && (
                        <p className="text-xs text-red-600 mt-0.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{item.errorMessage}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Progress, Status & Download */}
                  <div className="flex items-center gap-3 shrink-0">
                    {isProcessingItem && (
                      <div className="flex items-center gap-3">
                        <div className="w-24 sm:w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-600 animate-pulse" style={{ width: '70%' }}></div>
                        </div>
                        <span className="text-xs font-semibold text-teal-600">{t.converter.statusConverting}</span>
                      </div>
                    )}

                    {isDone && (
                      <div className="flex items-center gap-2">
                        <button
                          id={`download-item-${item.id}`}
                          onClick={() => downloadSingle(item)}
                          className="px-3.5 py-1.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{t.converter.btnDownload}</span>
                        </button>
                      </div>
                    )}

                    {isError && (
                      <button
                        onClick={() => {
                          setQueue((prev) => prev.filter((i) => i.id !== item.id));
                        }}
                        className="text-xs text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
                        title="Remove from queue"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* General error message banner */}
      {generalError && (
        <div
          id="converter-error-banner"
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-lg text-xs sm:text-sm flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{generalError}</span>
          </div>
          <button
            onClick={() => setGeneralError(null)}
            className="text-red-500 hover:text-red-800 text-xs font-semibold cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Quality Settings & Action Controls Bottom Bar */}
      <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
        {/* Quality Slider on left */}
        <div className="w-full sm:w-1/2">
          {config.outputFormat !== 'png' ? (
            <div>
              <div className="flex justify-between mb-1.5">
                <label htmlFor={qualitySliderId} className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                  {t.converter.qualityLabel}: <span className="text-teal-700 font-bold">{quality}%</span>
                </label>
              </div>
              <input
                id={qualitySliderId}
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-teal-600 h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                aria-label="Target image quality percentage"
              />
              <p className="text-xs text-gray-600 mt-1.5">
                {t.converter.qualityHelp}
              </p>
            </div>
          ) : (
            <div className="text-xs sm:text-sm text-gray-600 italic">
              Lossless PNG format preserves full original pixel quality automatically.
            </div>
          )}
        </div>

        {/* Action Buttons on right */}
        <div className="flex items-center justify-end gap-2.5 shrink-0">
          <button
            id="try-sample-btn"
            onClick={handleLoadSample}
            disabled={isProcessing}
            title={t.converter.btnTrySample}
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.converter.btnTrySample}</span>
          </button>

          {queue.length > 0 && (
            <button
              id="clear-queue-btn"
              onClick={handleClearQueue}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded transition-colors cursor-pointer"
            >
              {t.converter.btnClearQueue}
            </button>
          )}

          {completedCount > 1 ? (
            <button
              id="download-all-zip-btn"
              onClick={downloadAllZip}
              disabled={isZipping}
              className="px-6 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isZipping ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileArchive className="w-4 h-4" />
              )}
              <span>{t.converter.btnDownloadAll} ({completedCount})</span>
            </button>
          ) : (
            <button
              id="primary-upload-btn"
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{t.converter.uploadButton}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
