import { createDividerPlugin } from './createDividerPlugin';
import { DIVIDER_TYPE, DEFAULTS } from './constants';

export const pluginDivider = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: DIVIDER_TYPE,
    createPlugin: createDividerPlugin,
    ModalsMap: {},
    theme: colors => ({
      divider: {
        color: colors.textColor,
      },
    }),
  };
};
