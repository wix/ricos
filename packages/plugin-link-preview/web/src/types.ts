import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const LINK_PREVIEW_TYPE = 'wix-draft-plugin-link-preview';

export interface LinkPreviewPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface LinkPreviewPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
