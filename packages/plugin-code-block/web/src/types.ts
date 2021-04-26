import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const CODE_BLOCK_TYPE = 'code-block';

export interface CodeBlockPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface CodeBlockPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
