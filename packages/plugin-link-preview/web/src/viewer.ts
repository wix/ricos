import { LINK_PREVIEW_TYPE, LinkPreviewPluginViewerConfig } from './types';
import { typeMapper } from './typeMapper';
import { DEFAULTS } from './defaults';
import { ViewerPluginCreator } from 'wix-rich-content-common';

export { default as LinkPreviewViewer } from './LinkPreviewViewer';
export { typeMapper as linkPreviewTypeMapper, LINK_PREVIEW_TYPE };

export const pluginLinkPreview: ViewerPluginCreator<LinkPreviewPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINK_PREVIEW_TYPE,
    typeMapper,
  };
};
