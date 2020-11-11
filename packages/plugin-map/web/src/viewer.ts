import { typeMapper } from './typeMapper';
import { DEFAULTS } from './defaults';
import { MAP_TYPE, MapPluginViewerConfig } from './types';
import { ViewerPlugin } from 'wix-rich-content-common';
export { typeMapper as mapTypeMapper, MAP_TYPE };

export const pluginMap: ViewerPlugin<MapPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: MAP_TYPE,
    typeMapper,
  };
};
