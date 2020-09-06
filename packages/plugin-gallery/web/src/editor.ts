import { createGalleryPlugin } from './createGalleryPlugin';
import { GALLERY_TYPE } from './types';
import { ModalsMap } from './modals';
import { DEFAULTS, THEME as theme } from './defaults';

export const pluginGallery = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: GALLERY_TYPE,
    createPlugin: createGalleryPlugin,
    ModalsMap,
    theme,
  };
};
