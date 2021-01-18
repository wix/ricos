import { IMAGE_TYPE, ImagePluginEditorConfig } from './types';
import { ModalsMap } from './modals';
import { DEFAULTS } from './consts';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { createImagePlugin } from './createImagePlugin';

export const pluginImage: EditorPluginCreator<ImagePluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: IMAGE_TYPE,
    createPlugin: createImagePlugin,
    ModalsMap,
    componentData: DEFAULTS,
  };
};
