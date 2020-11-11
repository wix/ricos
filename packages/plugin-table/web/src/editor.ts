/*
  This module exports the required CreatePluginFunction for RicosEditor.
  If your plugin uses a modal, then make sure to uncomment 'ModalsMap'.
*/

import { createTablePlugin } from './createTablePlugin';
import { TABLE_TYPE, TablePluginEditorConfig } from './types';
// import { ModalsMap } from './modals';
import { DEFAULTS, theme } from './defaults';
import { EditorPluginFunction } from 'wix-rich-content-common';

export const pluginTable: EditorPluginFunction<TablePluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: TABLE_TYPE,
    createPlugin: createTablePlugin,
    // ModalsMap,
    theme,
  };
};
