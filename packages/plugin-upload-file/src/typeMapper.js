import UploadFileViewer from './upload-file-viewer';
import { UPLOAD_FILE_TYPE } from './types';
import { containerClassName } from './classNameStrategies';

export const typeMapper = () => ({
  [UPLOAD_FILE_TYPE]: { component: UploadFileViewer, classNameStrategies: { container: containerClassName } },
});
