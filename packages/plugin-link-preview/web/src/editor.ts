import { createLinkPreviewPlugin } from './createLinkPreviewPlugin';
import { LINK_PREVIEW_TYPE, LinkPreviewPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPluginFunction } from 'wix-rich-content-common';

export const pluginLinkPreview: EditorPluginFunction<LinkPreviewPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINK_PREVIEW_TYPE,
    createPlugin: createLinkPreviewPlugin,
    ModalsMap: {},
  };
};
