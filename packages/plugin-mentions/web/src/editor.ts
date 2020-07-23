import { createExternalMentionsPlugin } from './createMentionsPlugin';
import { EXTERNAL_MENTIONS_TYPE } from './types';
import { DEFAULTS, THEME as theme } from './defaultSettings';

export const pluginMentions = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: EXTERNAL_MENTIONS_TYPE,
    createPlugin: createExternalMentionsPlugin,
    ModalsMap: {},
    theme,
  };
};
