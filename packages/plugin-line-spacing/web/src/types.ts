import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const LINE_SPACING_TYPE = 'line-spacing';

export interface LineSpacingPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface LineSpacingPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
