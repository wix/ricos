import { createExternalMentionsPlugin } from './createMentionsPlugin';
import { MENTION_TYPE } from './types';
import { DEFAULTS, THEME as theme } from './defaultSettings';

export const pluginMentions = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: MENTION_TYPE,
    createPlugin: createExternalMentionsPlugin,
    ModalsMap: {},
    theme,
  };
};
