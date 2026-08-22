import { ConvertFormat } from '../types';

/**
 * Checks if the current browser environment can natively decode AVIF images.
 */
export async function checkAvifDecodeSupport(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const avifData =
    'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGAAAABAAAAAqaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAAHJpcGMAAAAAHGhpcmMBAAAAAQAAAA8AAAAaaXBtYQAAAAAAAAABAAEEAQKAAAAAY2F2MWMBCAAAAAAB';

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.width > 0 && img.height > 0);
    img.onerror = () => resolve(false);
    img.src = avifData;
  });
}

/**
 * Checks if the current browser canvas can export directly to a given format.
 */
export function checkFormatEncodeSupport(format: ConvertFormat): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const mime = getMimeType(format);
    const dataUrl = canvas.toDataURL(mime);
    return dataUrl.startsWith(`data:${mime}`);
  } catch {
    return false;
  }
}

/**
 * Formats bytes to human-readable size string (e.g. 1.2 MB)
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function getMimeType(format: ConvertFormat): string {
  switch (format) {
    case 'jpeg':
    case 'jpg':
    default:
      return 'image/jpeg';
  }
}

export function getFileExtension(format: ConvertFormat): string {
  switch (format) {
    case 'jpeg':
      return '.jpeg';
    case 'jpg':
    default:
      return '.jpg';
  }
}

/**
 * Converts any browser-readable image file into the target format with specified quality.
 * Client-side only using standard HTML5 Canvas 2D API.
 */
export async function convertImageInBrowser(
  file: File | Blob,
  targetFormat: ConvertFormat,
  qualityPercent: number = 85
): Promise<{
  blob: Blob;
  width: number;
  height: number;
  dataUrl: string;
}> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    // Security & cross-origin safety
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;

        if (width === 0 || height === 0) {
          URL.revokeObjectURL(objectUrl);
          reject(new Error('Invalid image dimensions (0x0). The image file may be damaged.'));
          return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { alpha: false });

        if (!ctx) {
          URL.revokeObjectURL(objectUrl);
          reject(new Error('Could not initialize canvas graphics rendering context.'));
          return;
        }

        // For JPG / JPEG: transparent background is filled with crisp white
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        const mime = getMimeType(targetFormat);
        const qualityFraction = Math.min(Math.max(qualityPercent / 100, 0.05), 1.0);

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(objectUrl);

            if (!blob) {
              reject(new Error('Failed to encode image to ' + targetFormat.toUpperCase() + '.'));
              return;
            }

            const dataUrl = URL.createObjectURL(blob);
            resolve({
              blob,
              width,
              height,
              dataUrl,
            });
          },
          mime,
          qualityFraction
        );
      } catch (err) {
        URL.revokeObjectURL(objectUrl);
        reject(
          err instanceof Error
            ? err
            : new Error('An unexpected error occurred during client-side image processing.')
        );
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(
        new Error(
          'Your browser cannot process this AVIF image directly. Please try a modern browser such as Chrome, Edge, Firefox, or Safari.'
        )
      );
    };

    img.src = objectUrl;
  });
}

/**
 * Generates an actual sample image file in-browser for quick testing
 */
export async function createSampleAvifOrImageFile(
  name = 'sample-nature.jpg',
  text = 'AVIF Sample',
  subtext = 'Click Convert to test'
): Promise<File> {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext('2d')!;

  // Background Gradient
  const grad = ctx.createLinearGradient(0, 0, 1200, 800);
  grad.addColorStop(0, '#0f766e');
  grad.addColorStop(0.5, '#0d9488');
  grad.addColorStop(1, '#065f46');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 800);

  // Artistic geometric accents
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.arc(1000, 150, 260, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.beginPath();
  ctx.arc(200, 700, 320, 0, Math.PI * 2);
  ctx.fill();

  // Draw card container inside
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.roundRect ? ctx.roundRect(150, 150, 900, 500, 24) : ctx.fillRect(150, 150, 900, 500);
  ctx.fill();

  // Photo-like graphic elements
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(350, 350, 70, 0, Math.PI * 2);
  ctx.fill();

  // Mountain silhouettes
  ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
  ctx.beginPath();
  ctx.moveTo(200, 600);
  ctx.lineTo(450, 380);
  ctx.lineTo(700, 600);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
  ctx.beginPath();
  ctx.moveTo(500, 600);
  ctx.lineTo(750, 340);
  ctx.lineTo(1000, 600);
  ctx.closePath();
  ctx.fill();

  // Typography
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 52px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, 600, 480);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = '500 24px system-ui, -apple-system, sans-serif';
  ctx.fillText(subtext, 600, 530);

  ctx.font = '400 18px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.fillText('AVIFtoJPG.in • 100% In-Browser Conversion', 600, 570);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        const file = new File([blob || new Blob([])], name, {
          type: blob?.type || 'image/jpeg',
          lastModified: Date.now(),
        });
        resolve(file);
      },
      'image/jpeg',
      0.9
    );
  });
}
