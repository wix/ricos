import { createVerticalEmbedPlugin } from './createVerticalEmbedPlugin';
import { DEFAULTS } from './constants';
import { VERTICAL_EMBED_TYPE, VerticalEmbedPluginEditorConfig } from './types';
import { ModalsMap } from './modals';
import { EditorPluginFunction } from 'wix-rich-content-common';

export const pluginVerticalEmbed: EditorPluginFunction<VerticalEmbedPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: VERTICAL_EMBED_TYPE,
    createPlugin: createVerticalEmbedPlugin,
    ModalsMap,
  };
};
