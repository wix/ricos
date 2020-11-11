import { typeMapper } from './typeMapper';
import { FILE_UPLOAD_TYPE, FilePluginViewerConfig } from './types';
export { typeMapper as fileUploadTypeMapper, FILE_UPLOAD_TYPE };
import { DEFAULTS } from './defaults';
import { ViewerPlugin } from 'wix-rich-content-common';

export const pluginFileUpload: ViewerPlugin<FilePluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.configViewer, ...config },
    type: FILE_UPLOAD_TYPE,
    typeMapper,
  };
};
