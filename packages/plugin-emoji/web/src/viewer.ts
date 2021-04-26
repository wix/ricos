import { DEFAULT_CONFIG } from './constants';
import { EMOJI_TYPE, EmojiPluginViewerConfig } from './types';
import { ViewerPluginCreator } from 'wix-rich-content-common';

export const pluginEmoji: ViewerPluginCreator<EmojiPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type: EMOJI_TYPE,
  };
};
