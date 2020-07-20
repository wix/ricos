import { createImagePlugin } from './createImagePlugin';
import { IMAGE_TYPE } from './types';
import { ModalsMap } from './modals';
import { DEFAULTS } from './consts';

export const pluginImage = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: IMAGE_TYPE,
    createPlugin: createImagePlugin,
    ModalsMap,
  };
};
