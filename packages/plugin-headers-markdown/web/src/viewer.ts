import { DraftDecorator } from 'draft-js';
import { strategy, component } from './decorator';
import {
  HEADERS_MARKDOWN_TYPE as type,
  HeadersMarkdownPluginViewerConfig,
  HeadersMarkdownPluginEditorConfig,
} from './types';
import { DEFAULTS } from './defaults';
import { ViewerPluginCreator } from 'wix-rich-content-common';

export const createHeadersMarkdownDecorator = (
  config: HeadersMarkdownPluginEditorConfig
): DraftDecorator => {
  const { [type]: settings = {} } = config;
  return {
    strategy,
    component: props => component({ ...props, ...settings }),
  };
};

export const pluginHeadersMarkdown: ViewerPluginCreator<HeadersMarkdownPluginViewerConfig> = config => {
  const finalConfig = { ...DEFAULTS.configViewer, ...config };
  return {
    config: finalConfig,
    type,
    decorator: (theme, config) => createHeadersMarkdownDecorator({ [type]: { ...config } }),
  };
};
