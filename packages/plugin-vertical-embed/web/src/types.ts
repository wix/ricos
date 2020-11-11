import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const VERTICAL_EMBED_TYPE = 'wix-draft-plugin-vertical-embed';

export interface VerticalEmbedPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface VerticalEmbedPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
