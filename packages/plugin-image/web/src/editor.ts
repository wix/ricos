import { createImagePlugin } from './createImagePlugin';
import { IMAGE_TYPE, ImagePluginEditorConfig } from './types';
import { ModalsMap } from './modals';
import { DEFAULTS } from './consts';
import { EditorPluginFunction } from 'wix-rich-content-common';

export const pluginImage: EditorPluginFunction<ImagePluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: IMAGE_TYPE,
    createPlugin: createImagePlugin,
    ModalsMap,
  };
};
