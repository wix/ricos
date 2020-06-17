import { createHeadersMarkdownDecorator } from './createHeadersMarkdownPlugin';
import { HEADERS_MARKDOWN_TYPE as type } from './types';
import { DEFAULTS } from './defaults';

export const pluginHeadersMarkdown = (config = {}) => {
  const finalConfig = { ...DEFAULTS.configViewer, ...config };
  return {
    config: finalConfig,
    type,
    decorator: (theme, config) => createHeadersMarkdownDecorator(config),
  };
};
