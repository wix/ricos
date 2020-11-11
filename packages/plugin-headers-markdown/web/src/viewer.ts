import { createHeadersMarkdownDecorator } from './createHeadersMarkdownPlugin';
import { HEADERS_MARKDOWN_TYPE as type, HeadersMarkdownPluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
import { ViewerPluginFunction } from 'wix-rich-content-common';

export const pluginHeadersMarkdown: ViewerPluginFunction<HeadersMarkdownPluginViewerConfig> = config => {
  const finalConfig = { ...DEFAULTS.configViewer, ...config };
  return {
    config: finalConfig,
    type,
    decorator: (theme, config) => createHeadersMarkdownDecorator(config),
  };
};
