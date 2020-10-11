import { LINK_PREVIEW_TYPE } from './types';
import { typeMapper } from './typeMapper';
import { DEFAULTS } from './defaults';

export { default as LinkPreviewViewer } from './LinkPreviewViewer';
export { typeMapper as linkPreviewTypeMapper, LINK_PREVIEW_TYPE };

export const pluginLinkPreview = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINK_PREVIEW_TYPE,
    typeMapper,
  };
};
