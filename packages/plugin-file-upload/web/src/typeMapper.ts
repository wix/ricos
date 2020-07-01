import FileUploadViewer from './file-upload-viewer';
import { FILE_UPLOAD_TYPE } from './types';
import { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [FILE_UPLOAD_TYPE]: {
    component: FileUploadViewer,
  },
});
