import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const INDENT_TYPE = 'wix-rich-content-plugin-indent';

export interface IndentPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface IndentPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
