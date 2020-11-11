import { createFileUploadPlugin } from './createFileUploadPlugin';
import { FILE_UPLOAD_TYPE, FilePluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPluginFunction } from 'wix-rich-content-common';

export const pluginFileUpload: EditorPluginFunction<FilePluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: FILE_UPLOAD_TYPE,
    createPlugin: createFileUploadPlugin,
    ModalsMap: {},
  };
};
