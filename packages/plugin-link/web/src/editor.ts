import { createLinkPlugin } from './createLinkPlugin';
import { LINK_TYPE, LinkPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginLink: EditorPluginCreator<LinkPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINK_TYPE,
    createPlugin: createLinkPlugin,
    ModalsMap: {},
  };
};
