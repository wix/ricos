import { typeMapper } from './typeMapper';
import { FILE_UPLOAD_TYPE } from './types';
export { typeMapper as fileUploadTypeMapper, FILE_UPLOAD_TYPE };

export const pluginFileUpload = (config = {}) => {
  return {
    config,
    type: FILE_UPLOAD_TYPE,
    typeMapper,
  };
};
