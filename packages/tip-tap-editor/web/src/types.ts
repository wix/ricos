import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const LINK_BUTTON_TYPE = 'wix-draft-plugin-link-button';
export const ACTION_BUTTON_TYPE = 'wix-draft-plugin-action-button';

export type ButtonPluginEditorConfig =
  | LinkButtonPluginEditorConfig
  | ActionButtonPluginEditorConfig;
export type ButtonPluginViewerConfig =
  | LinkButtonPluginViewerConfig
  | ActionButtonPluginViewerConfig;

export interface LinkButtonPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface LinkButtonPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface ActionButtonPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface ActionButtonPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
