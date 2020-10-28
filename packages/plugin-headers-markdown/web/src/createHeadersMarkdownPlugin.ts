import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { HEADERS_MARKDOWN_TYPE as type } from './types';
import { strategy, component } from './decorator';
import { CreatePluginFunction, PluginConfig } from 'wix-rich-content-common';
import { DraftDecorator } from 'draft-js';
import { DEFAULTS } from './defaults';

export const createHeadersMarkdownDecorator = (settings: PluginConfig): DraftDecorator => {
  return {
    strategy,
    component: props => component({ ...props, ...settings }),
  };
};

export const createHeadersMarkdownPlugin: CreatePluginFunction = config => {
  const { [type]: settings = {} } = config;
  const plugin = {
    decorators: [createHeadersMarkdownDecorator(settings)],
  };

  return createBasePlugin({ settings, type, defaultPluginData: DEFAULTS, ...config }, plugin);
};
