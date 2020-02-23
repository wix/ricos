import { createSoundCloudPlugin } from './createSoundCloudPlugin';
import { SOUND_CLOUD_TYPE } from './types';
import { DEFAULTS } from './defaults';
import { ModalsMap } from './modals';

export const pluginSoundCloud = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: SOUND_CLOUD_TYPE,
    createPlugin: createSoundCloudPlugin,
    ModalsMap,
  };
};
