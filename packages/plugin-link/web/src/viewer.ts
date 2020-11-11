import { LINK_TYPE, LinkPluginViewerConfig } from './types';
import { typeMapper } from './typeMapper';
import { DEFAULTS } from './defaults';
import { ViewerPlugin } from 'wix-rich-content-common';
export { typeMapper as linkTypeMapper, LINK_TYPE };
export { default as LinkViewer } from './LinkViewer';

export const pluginLink: ViewerPlugin<LinkPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINK_TYPE,
    typeMapper,
  };
};
