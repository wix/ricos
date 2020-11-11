export const LINK_BUTTON_TYPE = 'wix-draft-plugin-link-button';
export const ACTION_BUTTON_TYPE = 'wix-draft-plugin-action-button';

export type ButtonPluginEditorConfig =
  | LinkButtonPluginEditorConfig
  | ActionButtonPluginEditorConfig; // eslint-disable-line @typescript-eslint/no-explicit-any
export type ButtonPluginViewerConfig =
  | LinkButtonPluginViewerConfig
  | ActionButtonPluginViewerConfig; // eslint-disable-line @typescript-eslint/no-explicit-any

export type LinkButtonPluginEditorConfig = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
export type LinkButtonPluginViewerConfig = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any

export type ActionButtonPluginEditorConfig = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
export type ActionButtonPluginViewerConfig = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
