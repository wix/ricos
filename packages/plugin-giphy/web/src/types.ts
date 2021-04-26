import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const GIPHY_TYPE = 'wix-draft-plugin-giphy';

export interface GiphyPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface GiphyPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
