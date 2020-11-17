import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const SPOILER_TYPE = 'wix-rich-content-plugin-spoiler';

export interface SpoilerPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface SpoilerPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
