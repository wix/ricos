import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { HEADERS_MARKDOWN_TYPE as type, HeadersMarkdownPluginEditorConfig } from './types';
import { createHeadersMarkdownDecorator } from './viewer';
import { CreatePluginFunction } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

export const createHeadersMarkdownPlugin: CreatePluginFunction<HeadersMarkdownPluginEditorConfig> = config => {
  const { [type]: settings = {} } = config;
  const plugin = {
    decorators: [createHeadersMarkdownDecorator(config)],
  };

  return createBasePlugin({ settings, type, defaultPluginData: DEFAULTS, ...config }, plugin);
};
