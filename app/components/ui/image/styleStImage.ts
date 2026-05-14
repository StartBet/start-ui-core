import { sizeHeightClasses, sizeWidthClasses } from '~/types/Spacing';
import type { SizeValue } from '~/types/Spacing';

const cache = new Map<string, string>();

export const getImageCache = () => cache;

export const buildImageSizeClasses = (
  width?: SizeValue,
  height?: SizeValue
) => {
  return [
    width ? sizeWidthClasses[width] : undefined,
    height ? sizeHeightClasses[height] : undefined
  ].filter(Boolean);
};

const bufferToBase64 = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCodePoint(byte);
  }

  return btoa(binary);
};

export const blobToDataImage = async (blob: Blob) => {
  if (typeof FileReader !== 'undefined') {
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === 'string') resolve(result);
        else reject(new Error('Failed to read image'));
      };
      reader.onerror = () => reject(new Error('Failed to read image'));
      reader.readAsDataURL(blob);
    });
  }

  const contentType = blob.type || 'application/octet-stream';
  const base64 = bufferToBase64(await blob.arrayBuffer());
  return `data:${contentType};base64,${base64}`;
};
