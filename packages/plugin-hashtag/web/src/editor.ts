import { createHashtagPlugin } from './createHashtagPlugin';
import { HASHTAG_TYPE, HashtagPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPlugin } from 'wix-rich-content-common';

export const pluginHashtag: EditorPlugin<HashtagPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HASHTAG_TYPE,
    createPlugin: createHashtagPlugin,
    ModalsMap: {},
  };
};
