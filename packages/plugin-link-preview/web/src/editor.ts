import { createLinkPreviewPlugin } from './createLinkPreviewPlugin';
import { LINK_PREVIEW_TYPE, LinkPreviewPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPlugin } from 'wix-rich-content-common';

export const pluginLinkPreview: EditorPlugin<LinkPreviewPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINK_PREVIEW_TYPE,
    createPlugin: createLinkPreviewPlugin,
    ModalsMap: {},
  };
};
