import uuid from './uuid';
import { MediaUploadError } from 'wix-rich-content-common';

interface UploadStartBIData {
  correlationId: string;
  pluginId: string;
  fileSize?: number | undefined;
  mediaType?: string | undefined;
  timeStamp: number;
}

interface UploadEndBIData {
  correlationId: string;
  pluginId: string;
  fileSize?: number | undefined;
  mediaType?: string | undefined;
  duration: number;
  isSuccess: boolean;
  errorType?: string | undefined;
}

export const createUploadStartBIData = (
  pluginId: string,
  fileSize: number | undefined,
  mediaType: string | undefined
): UploadStartBIData => {
  const correlationId = uuid();
  return { correlationId, pluginId, fileSize, mediaType, timeStamp: Date.now() };
};

const errorMap = {
  0: 'Generic Error',
  1: 'File size too big',
  2: 'Quata Storage - Visitor',
  3: 'Quata Storage - Owner',
  4: 'Quata Video - Visitor',
  5: 'Quata Video - Owner',
};

export const createUploadEndBIData = (
  uploadBIData: UploadStartBIData,
  error: MediaUploadError
): UploadEndBIData => {
  const { correlationId, pluginId, fileSize, mediaType, timeStamp } = uploadBIData;
  const isSuccess = !error;
  const errorType = error ? (error.key ? errorMap[error.key] : 'Custom Error') : undefined;
  const duration = Date.now() - timeStamp;
  return {
    correlationId,
    pluginId,
    duration,
    fileSize,
    mediaType,
    isSuccess,
    errorType,
  };
};
