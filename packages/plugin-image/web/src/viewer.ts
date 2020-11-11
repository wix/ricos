import { typeMapper } from './typeMapper';
import { IMAGE_TYPE, ImagePluginViewerConfig } from './types';
import { DEFAULTS } from './consts';
import { ViewerPlugin } from 'wix-rich-content-common';
export { typeMapper as imageTypeMapper, IMAGE_TYPE };

export const pluginImage: ViewerPlugin<ImagePluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: IMAGE_TYPE,
    typeMapper,
  };
};
