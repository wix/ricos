import { typeMapper } from './typeMapper';
import { SPOILER_TYPE } from './types';
import { DEFAULTS, THEME as theme } from './defaults';
export { SPOILER_TYPE, typeMapper as spoilerTypeMapper };

export const pluginSpoiler = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: SPOILER_TYPE,
    typeMapper,
    theme,
  };
};
