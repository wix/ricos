import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const HTML_TYPE = 'wix-draft-plugin-html';

export interface HtmlPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface HtmlPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
