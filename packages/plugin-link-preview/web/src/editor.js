import { createLinkPreviewPlugin } from './createLinkPreviewPlugin';
import { LINK_PREVIEW_TYPE } from './types';
import { DEFAULTS } from './defaults';
import { linkPreviewUtil } from './lib/linkPreviewUtil';

export const pluginLinkPreview = (config = {}) => {
  const fetchData = linkPreviewUtil(config.authorization);

  return {
    config: { ...DEFAULTS.config, fetchData, ...config },
    type: LINK_PREVIEW_TYPE,
    createPlugin: createLinkPreviewPlugin,
    ModalsMap: {},
  };
};
