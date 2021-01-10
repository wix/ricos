/*
  This module exports the required CreatePluginFunction for RicosEditor.
  If your plugin uses a modal, then make sure to uncomment 'ModalsMap'.
*/

import { createUnsupportedBlocksPlugin } from './createUnsupportedBlocksPlugin';
import { UNSUPPORTED_BLOCKS_TYPE, UnsupportedBlocksPluginEditorConfig } from './types';
// import { ModalsMap } from './modals'; // Optional
// import { theme } from './defaults'; // Optional
import { DEFAULTS } from './defaults';
import { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginUnsupportedBlocks: EditorPluginCreator<UnsupportedBlocksPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: UNSUPPORTED_BLOCKS_TYPE,
    createPlugin: createUnsupportedBlocksPlugin,
    // ModalsMap,
    // theme,
  };
};
