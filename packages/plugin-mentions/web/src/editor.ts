import { createExternalMentionsPlugin } from './createMentionsPlugin';
import { MENTION_TYPE, MentionsPluginEditorConfig } from './types';
import { DEFAULTS } from './defaultSettings';
import { EditorPluginFunction } from 'wix-rich-content-common';

export const pluginMentions: EditorPluginFunction<MentionsPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: MENTION_TYPE,
    createPlugin: createExternalMentionsPlugin,
    ModalsMap: {},
  };
};
