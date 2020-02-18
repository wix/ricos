import { createFileUploadPlugin } from './createFileUploadPlugin';
import { FILE_UPLOAD_TYPE } from './types';
import { DEFAULTS } from './consts';

export const pluginFileUpload = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: FILE_UPLOAD_TYPE,
    createPlugin: createFileUploadPlugin,
    ModalsMap: {},
  };
};
