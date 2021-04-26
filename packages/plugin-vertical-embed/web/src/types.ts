import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const VERTICAL_EMBED_TYPE = 'wix-draft-plugin-vertical-embed';

interface VerticalPluginConfig {
  slimLayout?: boolean;
}

export interface VerticalEmbedPluginEditorConfig extends EditorPluginConfig, VerticalPluginConfig {
  getIsVisiblePromise?: (type: string, locale: string) => Promise<boolean>;
  exposeEmbedButtons?: string[];
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface VerticalEmbedPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
