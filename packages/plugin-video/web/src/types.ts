import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const VIDEO_TYPE = 'wix-draft-plugin-video';
export const VIDEO_TYPE_LEGACY = 'VIDEO-EMBED';

export interface VideoPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface VideoPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
