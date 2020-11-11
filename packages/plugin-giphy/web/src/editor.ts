import { createGiphyPlugin } from './createGiphyPlugin';
import { ModalsMap } from './modals';
import { DEFAULTS } from './constants';
import { GIPHY_TYPE, GiphyPluginEditorConfig } from './types';
import { EditorPluginFunction } from 'wix-rich-content-common';

export const pluginGiphy: EditorPluginFunction<GiphyPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: GIPHY_TYPE,
    createPlugin: createGiphyPlugin,
    ModalsMap,
  };
};
