import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const UNAVAILABLE_ON_ONEAPP_TYPE = 'unavailableononeapp';

export interface UnavailableOnOneAppPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface UnavailableOnOneAppPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
