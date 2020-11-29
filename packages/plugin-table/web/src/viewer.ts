/*
  This module exports the required CreatePluginFunction for RicosViewer.
  If your plugin uses decorations, then make sure to uncomment 'decorator'.
  (Please find examples of usage in other plugins)
*/

import { typeMapper } from './typeMapper';
import { TABLE_TYPE, TablePluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
import { ViewerPluginCreator } from 'wix-rich-content-common';
export { TABLE_TYPE, typeMapper as tableTypeMapper };

export const pluginTable: ViewerPluginCreator<TablePluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: TABLE_TYPE,
    typeMapper,
    // decorator: (theme, config) => ...
  };
};
