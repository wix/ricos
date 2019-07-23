import FileUploadViewer from './file-upload-viewer';
import { FILE_UPLOAD_TYPE } from './types';
import { containerClassName } from './classNameStrategies';

export const typeMapper = () => ({
  [FILE_UPLOAD_TYPE]: {
    component: FileUploadViewer,
    classNameStrategies: { container: containerClassName },
  },
});
