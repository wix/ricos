import { createHashtagPlugin } from './createHashtagPlugin';
import { HASHTAG_TYPE, HashtagPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPluginFunction } from 'wix-rich-content-common';

export const pluginHashtag: EditorPluginFunction<HashtagPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HASHTAG_TYPE,
    createPlugin: createHashtagPlugin,
    ModalsMap: {},
  };
};
