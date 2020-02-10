import { typeMapper } from './typeMapper';
import { GALLERY_TYPE } from './types';
export { typeMapper as galleryTypeMapper, GALLERY_TYPE };

const defaultConfig = {
  scrollingElement: () =>
    typeof window !== 'undefined' && document.getElementsByClassName('viewer-example')[0],
};

export const rcvGallery = (config = {}) => {
  return {
    config: { ...defaultConfig, ...config },
    type: GALLERY_TYPE,
    typeMapper,
    decorator: {},
  };
};
