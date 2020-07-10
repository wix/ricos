import { createGiphyPlugin } from './createGiphyPlugin';
import { ModalsMap } from './modals';
import { GIPHY_TYPE, DEFAULTS } from './constants';

export const pluginGiphy = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: GIPHY_TYPE,
    createPlugin: createGiphyPlugin,
    ModalsMap,
  };
};
