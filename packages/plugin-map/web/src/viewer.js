import { typeMapper } from './typeMapper';
import { MAP_TYPE, DEFAULTS } from './constants';
export { typeMapper as mapTypeMapper, MAP_TYPE };

export const pluginMap = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: MAP_TYPE,
    typeMapper,
  };
};
