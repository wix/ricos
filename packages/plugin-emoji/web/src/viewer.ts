import { DEFAULT_CONFIG } from './constants';
import { EMOJI_TYPE, EmojiPluginViewerConfig } from './types';
import { ViewerPluginFunction } from 'wix-rich-content-common';

export const pluginEmoji: ViewerPluginFunction<EmojiPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type: EMOJI_TYPE,
  };
};
