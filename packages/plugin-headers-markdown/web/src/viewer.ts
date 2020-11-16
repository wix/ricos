import { createHeadersMarkdownDecorator } from './createHeadersMarkdownPlugin';
import { HEADERS_MARKDOWN_TYPE as type, HeadersMarkdownPluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
import { ViewerPluginCreator } from 'wix-rich-content-common';

export const pluginHeadersMarkdown: ViewerPluginCreator<HeadersMarkdownPluginViewerConfig> = config => {
  const finalConfig = { ...DEFAULTS.configViewer, ...config };
  return {
    config: finalConfig,
    type,
    decorator: (theme, config) => createHeadersMarkdownDecorator({ [type]: { ...config } }),
  };
};
