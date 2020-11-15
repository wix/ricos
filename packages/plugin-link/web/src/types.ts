import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const EXTERNAL_LINK_TYPE = 'wix-draft-plugin-external-link';
export const LINK_TYPE = 'LINK';

export interface LinkPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface LinkPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
