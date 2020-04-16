import { createLinkPlugin } from './createLinkPlugin';
import { LINK_TYPE } from './types';
import { DEFAULTS, THEME as theme } from './defaults';

export const pluginLink = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINK_TYPE,
    createPlugin: createLinkPlugin,
    ModalsMap: {},
    theme,
  };
};
