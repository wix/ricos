import { createLinkPreviewPlugin } from './createLinkPreviewPlugin';
import { LINK_PREVIEW_TYPE } from './types';
import { DEFAULTS } from './defaults';

export const pluginLinkPreview = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINK_PREVIEW_TYPE,
    createPlugin: createLinkPreviewPlugin,
    ModalsMap: {},
  };
};
