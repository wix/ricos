import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const SOUND_CLOUD_TYPE = 'wix-draft-plugin-sound-cloud';

export interface SoundCloudPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface SoundCloudPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
