import { createGiphyPlugin } from './createGiphyPlugin';
import { ModalsMap } from './modals';
import { DEFAULTS } from './constants';
import { GIPHY_TYPE, GiphyPluginEditorConfig } from './types';
import { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginGiphy: EditorPluginCreator<GiphyPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: GIPHY_TYPE,
    createPlugin: createGiphyPlugin,
    ModalsMap,
  };
};
