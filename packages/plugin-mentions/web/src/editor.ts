import { createExternalMentionsPlugin } from './createMentionsPlugin';
import { MENTION_TYPE } from './types';
import { DEFAULTS } from './defaultSettings';

export const pluginMentions = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: MENTION_TYPE,
    createPlugin: createExternalMentionsPlugin,
    ModalsMap: {},
  };
};
