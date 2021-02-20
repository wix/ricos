import { createEmojiPlugin } from './createEmojiPlugin';
import { DEFAULT_CONFIG } from './constants';
import { EMOJI_TYPE, EmojiPluginEditorConfig } from './types';
import { EditorPluginCreator } from 'wix-rich-content-common';
//import 'https://unpkg.com/browse/wix-rich-content-plugin-emoji@6.8.4/dist/styles.min.css';

export const pluginEmoji: EditorPluginCreator<EmojiPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type: EMOJI_TYPE,
    createPlugin: createEmojiPlugin,
    ModalsMap: {},
  };
};
