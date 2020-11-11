import { typeMapper } from './typeMapper';
import { SOUND_CLOUD_TYPE, SoundCloudPluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
import { ViewerPluginFunction } from 'wix-rich-content-common';
export { typeMapper as soundCloudTypeMapper };

export const pluginSoundCloud: ViewerPluginFunction<SoundCloudPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: SOUND_CLOUD_TYPE,
    typeMapper,
  };
};
