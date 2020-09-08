import { MediaUploadErrorKey } from 'wix-rich-content-common';

export const errorMessages = {
  [MediaUploadErrorKey.GENERIC]: { t_key: 'UploadFile_Error_Generic_Item', renderBlock: true },
  [MediaUploadErrorKey.QUOTA_STORAGE_VISITOR]: {
    t_key: 'UploadFile_Error_Generic_Item',
    renderBlock: false,
  },
  [MediaUploadErrorKey.QUOTA_STORAGE_OWNER]: {
    t_key: 'UploadFile_Error_Generic_Item',
    renderBlock: false,
  },
  [MediaUploadErrorKey.QUOTA_VIDEO_VISITOR]: {
    t_key: 'UploadFile_Error_Generic_Item',
    renderBlock: false,
  },
  [MediaUploadErrorKey.QUOTA_VIDEO_OWNER]: {
    t_key: 'UploadFile_Error_Generic_Item',
    renderBlock: false,
  },
  [MediaUploadErrorKey.SIZE_LIMIT]: { t_key: 'UploadFile_Error_Size_Item', renderBlock: true },
};

export function shouldRenderBlock(error) {
  const errorMessage = errorMessages[error?.key];
  if (errorMessage) {
    return errorMessage.renderBlock;
  }
  return true;
}
