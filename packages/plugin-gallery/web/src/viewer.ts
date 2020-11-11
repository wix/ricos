import { typeMapper } from './typeMapper';
import { GALLERY_TYPE, GalleryPluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
import { ViewerPlugin } from 'wix-rich-content-common';
export { typeMapper as galleryTypeMapper, GALLERY_TYPE };

export const pluginGallery: ViewerPlugin<GalleryPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: GALLERY_TYPE,
    typeMapper,
  };
};
