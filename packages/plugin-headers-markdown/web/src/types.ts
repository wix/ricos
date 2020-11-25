import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const HEADERS_MARKDOWN_TYPE = 'wix-draft-plugin-headers-markdown';

export interface HeadersMarkdownPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface HeadersMarkdownPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
