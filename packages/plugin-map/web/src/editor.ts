import { createMapPlugin } from './createMapPlugin';
import { MAP_TYPE, DEFAULTS, THEME as theme } from './defaults';

export const pluginMap = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: MAP_TYPE,
    createPlugin: createMapPlugin,
    ModalsMap: {},
    theme,
  };
};
