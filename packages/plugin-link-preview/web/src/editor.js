import { createLinkPreviewPlugin } from './createLinkPreviewPlugin';
import { LINK_PREVIEW_TYPE } from './types';
import { DEFAULTS, THEME as theme } from './defaults';
import { createFetchLinkPreviewData } from './lib/fetchLinkPreviewData';

export const pluginLinkPreview = (config = {}) => {
  const fetchData = createFetchLinkPreviewData(config.authorization);

  return {
    config: { ...DEFAULTS.config, fetchData, ...config },
    type: LINK_PREVIEW_TYPE,
    createPlugin: createLinkPreviewPlugin,
    ModalsMap: {},
    theme,
  };
};
