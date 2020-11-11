import { createGalleryPlugin } from './createGalleryPlugin';
import { GALLERY_TYPE, GalleryPluginEditorConfig } from './types';
import { ModalsMap } from './modals';
import { DEFAULTS } from './defaults';
import { EditorPlugin } from 'wix-rich-content-common';

export const pluginGallery: EditorPlugin<GalleryPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: GALLERY_TYPE,
    createPlugin: createGalleryPlugin,
    ModalsMap,
  };
};
