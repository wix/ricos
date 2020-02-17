import { createLinkPlugin } from './createLinkPlugin';
import { LINK_TYPE } from './types';
import { DEFAULTS } from './defaults';

export const pluginLink = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINK_TYPE,
    createPlugin: createLinkPlugin,
    ModalsMap: {},
  };
};
