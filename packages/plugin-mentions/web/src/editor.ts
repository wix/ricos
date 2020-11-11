import { createExternalMentionsPlugin } from './createMentionsPlugin';
import { MENTION_TYPE, MentionsPluginEditorConfig } from './types';
import { DEFAULTS } from './defaultSettings';
import { EditorPlugin } from 'wix-rich-content-common';

export const pluginMentions: EditorPlugin<MentionsPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: MENTION_TYPE,
    createPlugin: createExternalMentionsPlugin,
    ModalsMap: {},
  };
};
