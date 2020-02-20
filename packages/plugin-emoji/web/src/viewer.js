import { EMOJI_TYPE, DEFAULT_CONFIG } from './constants';

export const pluginEmoji = (config = {}) => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type: EMOJI_TYPE,
  };
};
