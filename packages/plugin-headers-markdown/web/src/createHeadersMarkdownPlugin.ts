import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { HEADERS_MARKDOWN_TYPE as type, HeadersMarkdownPluginEditorConfig } from './types';
import { strategy, component } from './decorator';
import { CreatePluginFunction } from 'wix-rich-content-common';
import { DraftDecorator } from 'draft-js';
import { DEFAULTS } from './defaults';

export const createHeadersMarkdownDecorator = (
  config: HeadersMarkdownPluginEditorConfig
): DraftDecorator => {
  const { [type]: settings = {} } = config;
  return {
    strategy,
    component: props => component({ ...props, ...settings }),
  };
};

export const createHeadersMarkdownPlugin: CreatePluginFunction<HeadersMarkdownPluginEditorConfig> = config => {
  const { [type]: settings = {} } = config;
  const plugin = {
    decorators: [createHeadersMarkdownDecorator(config)],
  };

  return createBasePlugin({ settings, type, defaultPluginData: DEFAULTS, ...config }, plugin);
};
