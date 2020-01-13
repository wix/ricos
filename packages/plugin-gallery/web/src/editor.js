import { createGalleryPlugin } from './createGalleryPlugin';
import { GALLERY_TYPE } from './types';
import { ModalsMap } from './modals';

const defaultConfig = {
  scrollingElement: () =>
    typeof window !== 'undefined' && document.getElementsByClassName('editor-example')[0],
  // toolbar: {
  //   icons: {
  //     Gallery: MyCustomIcon, // insert plugin icon
  //   },
  // },
};

export const pluginGallery = (config = {}) => {
  return {
    config: { ...defaultConfig, ...config },
    type: GALLERY_TYPE,
    createPlugin: createGalleryPlugin,
    ModalsMap,
  };
};
