import { createGalleryPlugin } from './createGalleryPlugin';
import { GALLERY_TYPE, GalleryPluginEditorConfig } from './types';
import { ModalsMap } from './modals';
import { DEFAULTS } from './defaults';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { createGalleryData } from './createGalleryData';

export const pluginGallery: EditorPluginCreator<GalleryPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: GALLERY_TYPE,
    createPlugin: createGalleryPlugin,
    ModalsMap,
    createPluginData: createGalleryData,
  };
};
