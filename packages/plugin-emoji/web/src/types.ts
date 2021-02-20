import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const EMOJI_TYPE = 'wix-draft-plugin-emoji';

export interface EmojiPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface EmojiPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
