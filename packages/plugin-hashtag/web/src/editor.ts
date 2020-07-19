import { createHashtagPlugin } from './createHashtagPlugin';
import { HASHTAG_TYPE } from './types';
import { DEFAULTS, THEME as theme } from './defaults';

export const pluginHashtag = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HASHTAG_TYPE,
    createPlugin: createHashtagPlugin,
    ModalsMap: {},
    theme,
  };
};
