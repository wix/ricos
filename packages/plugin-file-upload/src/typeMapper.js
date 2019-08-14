import FileUploadViewer from './file-upload-viewer';
import { FILE_UPLOAD_TYPE } from './types';

export const typeMapper = () => ({
  [FILE_UPLOAD_TYPE]: {
    component: FileUploadViewer,
  },
});
