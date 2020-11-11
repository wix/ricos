import { typeMapper } from './typeMapper';
import { GALLERY_TYPE, GalleryPluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
import { ViewerPluginFunction } from 'wix-rich-content-common';
export { typeMapper as galleryTypeMapper, GALLERY_TYPE };

export const pluginGallery: ViewerPluginFunction<GalleryPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: GALLERY_TYPE,
    typeMapper,
  };
};
