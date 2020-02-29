import { createHtmlPlugin } from './createHtmlPlugin';
import { HTML_TYPE } from './types';
import { DEFAULTS } from './constants';

export const pluginHtml = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HTML_TYPE,
    createPlugin: createHtmlPlugin,
    ModalsMap: {},
  };
};
