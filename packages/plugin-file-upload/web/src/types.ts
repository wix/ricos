import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const FILE_UPLOAD_TYPE = 'wix-draft-plugin-file-upload';

export interface FilePluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface FilePluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
