import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const DIVIDER_TYPE = 'wix-draft-plugin-divider';

export interface DividerPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface DividerPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
