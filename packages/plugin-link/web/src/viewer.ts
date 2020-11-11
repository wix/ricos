import { LINK_TYPE, LinkPluginViewerConfig } from './types';
import { typeMapper } from './typeMapper';
import { DEFAULTS } from './defaults';
import { ViewerPluginFunction } from 'wix-rich-content-common';
export { typeMapper as linkTypeMapper, LINK_TYPE };
export { default as LinkViewer } from './LinkViewer';

export const pluginLink: ViewerPluginFunction<LinkPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINK_TYPE,
    typeMapper,
  };
};
