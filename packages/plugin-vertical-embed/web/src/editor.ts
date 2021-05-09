import { createVerticalEmbedPlugin } from './createVerticalEmbedPlugin';
import { VERTICAL_EMBED_TYPE, VerticalEmbedPluginEditorConfig } from './types';
import { ModalsMap } from './modals';
import { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginVerticalEmbed: EditorPluginCreator<VerticalEmbedPluginEditorConfig> = config => {
  return {
    config: { ...config },
    type: VERTICAL_EMBED_TYPE,
    createPlugin: createVerticalEmbedPlugin,
    ModalsMap,
  };
};
