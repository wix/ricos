import {
  EditorPluginConfig,
  ViewerPluginConfig,
  ComponentData,
  Helpers,
  Pubsub,
  TranslationFunction,
  RichContentTheme,
} from 'wix-rich-content-common';

export const VIDEO_TYPE = 'wix-draft-plugin-video';
export const VIDEO_TYPE_LEGACY = 'VIDEO-EMBED';

export interface VideoPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface VideoPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface VideoSettingsProps {
  componentData: ComponentData;
  helpers: Helpers;
  pubsub: Pubsub;
  theme: RichContentTheme;
  t: TranslationFunction;
  isMobile: boolean;
  settings: VideoPluginEditorConfig;
}
