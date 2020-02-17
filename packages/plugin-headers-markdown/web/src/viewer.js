import { createHeadersMarkdownDecorator } from './createHeadersMarkdownPlugin';
import { HEADERS_MARKDOWN_TYPE } from './types';
import { DEFAULTS } from './defaults';

export const pluginHeadersMarkdown = (config = {}) => {
  const finalConfig = { ...DEFAULTS.config, ...config };
  return {
    config: finalConfig,
    type: HEADERS_MARKDOWN_TYPE,
    decorator: createHeadersMarkdownDecorator(finalConfig),
  };
};
