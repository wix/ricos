import { createHtmlPlugin } from './createHtmlPlugin';
import { HTML_TYPE } from './types';
import { DEFAULTS_CONFIG, THEME as theme } from './defaults';

export const pluginHtml = (config = {}) => {
  return {
    config: { ...DEFAULTS_CONFIG, ...config },
    type: HTML_TYPE,
    createPlugin: createHtmlPlugin,
    ModalsMap: {},
    theme,
  };
};
