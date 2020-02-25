import { createEmojiPlugin } from './createEmojiPlugin';
import { EMOJI_TYPE, DEFAULT_CONFIG } from './constants';
//import 'https://unpkg.com/browse/wix-rich-content-plugin-emoji@6.8.4/dist/styles.min.css';

export const pluginEmoji = (config = {}) => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type: EMOJI_TYPE,
    createPlugin: createEmojiPlugin,
    ModalsMap: {},
    theme: () => ({}),
  };
};
