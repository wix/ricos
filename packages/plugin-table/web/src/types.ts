import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const TABLE_TYPE = 'table';

export interface TablePluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface TablePluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
