import { createDividerPlugin } from './createDividerPlugin';
import { DIVIDER_TYPE } from './constants';

const defaultConfig = {};

export const pluginDivider = (config = {}) => {
  return {
    config: { ...defaultConfig, ...config },
    type: DIVIDER_TYPE,
    createPlugin: createDividerPlugin,
    ModalsMap: {},
  };
};
