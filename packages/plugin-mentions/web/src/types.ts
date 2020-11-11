import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const EXTERNAL_MENTIONS_TYPE = 'wix-draft-plugin-external-mentions';
export const MENTION_TYPE = 'mention';

export interface MentionsPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface MentionsPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
