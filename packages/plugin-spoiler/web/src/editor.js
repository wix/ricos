import { createSpoilerPlugin } from './createSpoilerPlugin';
import { SPOILER_TYPE } from './types';
import { DEFAULTS, THEME as theme } from './defaults';

export const pluginSpoiler = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: SPOILER_TYPE,
    createPlugin: createSpoilerPlugin,
    ModalsMap: {},
    theme,
  };
};
