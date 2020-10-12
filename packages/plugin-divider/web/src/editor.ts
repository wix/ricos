import { createDividerPlugin } from './createDividerPlugin';
import { DIVIDER_TYPE, DEFAULTS } from './defaults';

export const pluginDivider = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: DIVIDER_TYPE,
    createPlugin: createDividerPlugin,
    ModalsMap: {},
  };
};
