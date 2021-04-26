import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const HASHTAG_TYPE = 'wix-draft-plugin-hashtag';

export interface HashtagPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface HashtagPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
