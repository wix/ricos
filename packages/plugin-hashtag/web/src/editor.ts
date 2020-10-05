import { createHashtagPlugin } from './createHashtagPlugin';
import { HASHTAG_TYPE } from './types';
import { DEFAULTS } from './defaults';

export const pluginHashtag = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HASHTAG_TYPE,
    createPlugin: createHashtagPlugin,
    ModalsMap: {},
  };
};
