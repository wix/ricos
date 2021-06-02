import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const COLLAPSIBLE_LIST_TYPE = 'wix-rich-content-plugin-collapsible-list';

export interface CollapsibleListPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface CollapsibleListPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
