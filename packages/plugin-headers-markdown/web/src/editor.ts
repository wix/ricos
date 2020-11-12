import { createHeadersMarkdownPlugin } from './createHeadersMarkdownPlugin';
import { HEADERS_MARKDOWN_TYPE, HeadersMarkdownPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginHeadersMarkdown: EditorPluginCreator<HeadersMarkdownPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HEADERS_MARKDOWN_TYPE,
    createPlugin: createHeadersMarkdownPlugin,
    ModalsMap: {},
  };
};
