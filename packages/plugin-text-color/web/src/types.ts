import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const TEXT_COLOR_TYPE = 'wix-rich-content-text-color';
export const TEXT_HIGHLIGHT_TYPE = 'wix-rich-content-text-highlight';

export interface TextColorPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface TextColorPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface TextHighlightPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface TextHighlightPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
