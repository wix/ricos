import { createVerticalEmbedPlugin } from './createVerticalEmbedPlugin';
import { VERTICAL_EMBED_TYPE, DEFAULTS } from './constants';
import { ModalsMap } from './modals';

export const pluginVerticalEmbed = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: VERTICAL_EMBED_TYPE,
    createPlugin: createVerticalEmbedPlugin,
    ModalsMap,
  };
};
