import uuid from './uuid';

const timeStampMap = {};

export const onUploadStart = (
  pluginId,
  onMediaUploadStart,
  fileSize = undefined,
  mediaType = undefined
) => {
  const correlationId = uuid();
  timeStampMap[correlationId] = Date.now();
  const uploadingFileBI = { correlationId, pluginId, fileSize, mediaType };
  onMediaUploadStart?.(...uploadingFileBI);
  return uploadingFileBI;
};

const errorMap = {
  0: 'Generic Error',
  1: 'File size too big',
  2: 'Quata Storage - Visitor',
  3: 'Quata Storage - Owner',
  4: 'Quata Video - Visitor',
  5: 'Quata Video - Owner',
};

export const onUploadEnd = (
  onMediaUploadEnd,
  correlationId,
  pluginId,
  fileSize,
  mediaType,
  data,
  error
) => {
  let isSuccess = true;
  let errorReason;
  const duration = Date.now() - timeStampMap[correlationId];
  // eslint-disable-next-line fp/no-delete
  delete timeStampMap[correlationId];
  if (error) {
    isSuccess = false;
    errorReason = errorMap[error.key] || 'Custom Error';
  }
  onMediaUploadEnd?.(
    correlationId,
    pluginId,
    fileSize || data?.size,
    mediaType || data?.type,
    duration,
    isSuccess,
    errorReason
  );
};
