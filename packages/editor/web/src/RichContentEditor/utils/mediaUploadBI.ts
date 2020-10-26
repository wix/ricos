import uuid from './uuid';
import { MediaUploadError } from 'wix-rich-content-common';

interface UploadStartBIData {
  correlationId: string;
  pluginId: string;
  fileSize?: number | undefined;
  mediaType?: string | undefined;
  timeStamp: number;
}

interface UploadEndBIData extends UploadStartBIData {
  duration: number;
  isSuccess: boolean;
  errorReason: string | undefined;
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
  const isSuccess = !!error;
  const errorReason = error ? (error.key ? errorMap[error.key] : 'Custom Error') : undefined;
  const duration = Date.now() - uploadBIData.timeStamp;
  const uploadEndData = uploadBIData;
  // eslint-disable-next-line fp/no-delete
  delete uploadEndData.timeStamp;
  return {
    ...uploadEndData,
    duration,
    isSuccess,
    errorReason,
  };
};
