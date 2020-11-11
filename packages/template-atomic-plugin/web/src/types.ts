import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const YOUR_PLUGIN_NAME_TYPE = 'yourPluginName';

export interface YourPluginNamePluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface YourPluginNamePluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
