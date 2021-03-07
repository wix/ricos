import {
  EditorPluginConfig,
  ViewerPluginConfig,
  CreatePluginFunction,
} from 'wix-rich-content-common';

export const TABLE_TYPE = 'wix-rich-content-plugin-table';

export interface TablePluginEditorConfig extends EditorPluginConfig {
  innerRCEPlugins?: CreatePluginFunction[];
}
export interface TablePluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
