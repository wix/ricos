import { typeMapper } from './typeMapper';
import { SOUND_CLOUD_TYPE } from './types';
import { DEFAULTS } from './defaults';
export { typeMapper as soundCloudTypeMapper };

export const pluginSoundCloud = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: SOUND_CLOUD_TYPE,
    typeMapper,
  };
};
