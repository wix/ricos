import { createFileUploadPlugin } from './createFileUploadPlugin';
import { FILE_UPLOAD_TYPE, FilePluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPlugin } from 'wix-rich-content-common';

export const pluginFileUpload: EditorPlugin<FilePluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: FILE_UPLOAD_TYPE,
    createPlugin: createFileUploadPlugin,
    ModalsMap: {},
  };
};
