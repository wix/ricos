import { createHeadersMarkdownPlugin } from './createHeadersMarkdownPlugin';
import { HEADERS_MARKDOWN_TYPE } from './types';
import { DEFAULTS } from './defaults';

export const pluginHeadersMarkdown = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HEADERS_MARKDOWN_TYPE,
    createPlugin: createHeadersMarkdownPlugin,
    ModalsMap: {},
  };
};
