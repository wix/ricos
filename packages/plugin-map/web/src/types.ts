import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const MAP_TYPE = 'wix-draft-plugin-map';

export interface MapPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface MapPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
