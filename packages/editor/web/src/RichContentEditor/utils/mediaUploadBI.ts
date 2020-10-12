import uuid from './uuid';
import { MediaUploadError } from 'wix-rich-content-common';

const timeStampMap = {};

interface uploadStartBIData {
  correlationId: string;
  pluginId: string;
  fileSize: number | undefined;
  mediaType: string | undefined;
}

interface uploadEndBIData extends uploadStartBIData {
  duration: number;
  isSuccess: boolean;
  errorReason: string | undefined;
}

export const createUploadStartBIData = (
  pluginId: string,
  fileSize: number | undefined,
  mediaType: string | undefined
): uploadStartBIData => {
  const correlationId = uuid();
  timeStampMap[correlationId] = Date.now();
  return { correlationId, pluginId, fileSize, mediaType };
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
  uploadBIData: uploadStartBIData,
  error: MediaUploadError
): uploadEndBIData => {
  let isSuccess = true;
  let errorReason: string | undefined;
  const duration = Date.now() - timeStampMap[uploadBIData.correlationId];
  // eslint-disable-next-line fp/no-delete
  delete timeStampMap[uploadBIData.correlationId];
  if (error) {
    isSuccess = false;
    errorReason = errorMap[error.key] || 'Custom Error';
  }
  return {
    ...uploadBIData,
    duration,
    isSuccess,
    errorReason,
  };
};
