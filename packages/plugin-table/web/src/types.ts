import {
  EditorPluginConfig,
  ViewerPluginConfig,
  CreatePluginFunction,
} from 'wix-rich-content-common';

export const TABLE_TYPE = 'table';

export interface TablePluginEditorConfig extends EditorPluginConfig {
  innerRCEPlugins?: CreatePluginFunction[];
}
export interface TablePluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
