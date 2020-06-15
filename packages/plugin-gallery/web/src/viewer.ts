import { typeMapper } from './typeMapper';
import { GALLERY_TYPE } from './types';
import { DEFAULTS } from './constants';
export { typeMapper as galleryTypeMapper, GALLERY_TYPE };

export const pluginGallery = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: GALLERY_TYPE,
    typeMapper,
  };
};
