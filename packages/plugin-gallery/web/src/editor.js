import { createGalleryPlugin } from './createGalleryPlugin';
import { GALLERY_TYPE } from './types';
import { ModalsMap } from './modals';

const config = {
  scrollingElement: () =>
    typeof window !== 'undefined' && document.getElementsByClassName('editor-example')[0],
  // toolbar: {
  //   icons: {
  //     Gallery: MyCustomIcon, // insert plugin icon
  //   },
  // },
};

export const pluginGallery = {
  config,
  type: GALLERY_TYPE,
  createPlugin: createGalleryPlugin,
  ModalsMap,
};
