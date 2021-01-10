/*
  This module exports the required CreatePluginFunction for RicosViewer.
  If your plugin uses decorations, then make sure to uncomment 'decorator'.
  (Please find examples of usage in other plugins)
*/

import { typeMapper } from './typeMapper';
import { UNSUPPORTED_BLOCKS_TYPE, UnsupportedBlocksPluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
import { ViewerPluginCreator } from 'wix-rich-content-common';
// import { theme } from './defaults'; // Optional
export { UNSUPPORTED_BLOCKS_TYPE, typeMapper as unsupportedblocksTypeMapper };

export const pluginUnsupportedBlocks: ViewerPluginCreator<UnsupportedBlocksPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: UNSUPPORTED_BLOCKS_TYPE,
    typeMapper,
    // theme,
    // decorator: (theme, config) => ...
  };
};
