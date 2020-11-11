import { createGalleryPlugin } from './createGalleryPlugin';
import { GALLERY_TYPE, GalleryPluginEditorConfig } from './types';
import { ModalsMap } from './modals';
import { DEFAULTS } from './defaults';
import { EditorPluginFunction } from 'wix-rich-content-common';

export const pluginGallery: EditorPluginFunction<GalleryPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: GALLERY_TYPE,
    createPlugin: createGalleryPlugin,
    ModalsMap,
  };
};
