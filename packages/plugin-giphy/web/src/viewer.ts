import { typeMapper } from './typeMapper';
import { DEFAULTS } from './constants';
import { GIPHY_TYPE, GiphyPluginViewerConfig } from './types';
import { ViewerPlugin } from 'wix-rich-content-common';
export { typeMapper as giphyTypeMapper, GIPHY_TYPE };

export const pluginGiphy: ViewerPlugin<GiphyPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.configViewer, ...config },
    type: GIPHY_TYPE,
    typeMapper,
  };
};
