import { typeMapper } from './typeMapper';
import { FILE_UPLOAD_TYPE } from './types';
export { typeMapper as fileUploadTypeMapper, FILE_UPLOAD_TYPE };
import { DEFAULTS } from './defaults';

export const pluginFileUpload = (config = {}) => {
  return {
    config: { ...DEFAULTS.configViewer, ...config },
    type: FILE_UPLOAD_TYPE,
    typeMapper,
  };
};
