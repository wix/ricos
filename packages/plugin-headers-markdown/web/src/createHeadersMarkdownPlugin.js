import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { HEADERS_MARKDOWN_TYPE as type } from './types';
import { strategy, component } from './decorator';

export const createHeadersMarkdownDecorator = (config = {}) => {
  const { [type]: configProps = {} } = config;
  return {
    strategy,
    component: props => component({ ...props, ...configProps }),
  };
};

export const createHeadersMarkdownPlugin = config => {
  const plugin = {
    decorators: [createHeadersMarkdownDecorator(config)],
  };

  return createBasePlugin({}, plugin);
};
