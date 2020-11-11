import { typeMapper } from './typeMapper';
import { DEFAULTS } from './defaults';
import { MAP_TYPE, MapPluginViewerConfig } from './types';
import { ViewerPluginFunction } from 'wix-rich-content-common';
export { typeMapper as mapTypeMapper, MAP_TYPE };

export const pluginMap: ViewerPluginFunction<MapPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: MAP_TYPE,
    typeMapper,
  };
};
