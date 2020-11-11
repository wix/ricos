import { createLinkPlugin } from './createLinkPlugin';
import { LINK_TYPE, LinkPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPlugin } from 'wix-rich-content-common';

export const pluginLink: EditorPlugin<LinkPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINK_TYPE,
    createPlugin: createLinkPlugin,
    ModalsMap: {},
  };
};
