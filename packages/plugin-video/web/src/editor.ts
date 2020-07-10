import { createVideoPlugin } from './createVideoPlugin';
import { VIDEO_TYPE } from './types';
import { DEFAULTS } from './defaults';
import { ModalsMap } from './modals';

export const pluginVideo = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: VIDEO_TYPE,
    createPlugin: createVideoPlugin,
    ModalsMap,
  };
};
