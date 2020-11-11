/*
  This module exports the required CreatePluginFunction for RicosViewer.
  If your plugin uses decorations, then make sure to uncomment 'decorator'.
  (Please find examples of usage in other plugins)
*/

import { typeMapper } from './typeMapper';
import { YOUR_PLUGIN_NAME_TYPE, YourPluginNamePluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
import { ViewerPluginFunction } from 'wix-rich-content-common';
// import { theme } from './defaults'; // Optional
export { YOUR_PLUGIN_NAME_TYPE, typeMapper as yourPluginNameTypeMapper };

export const pluginYourPluginName: ViewerPluginFunction<YourPluginNamePluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: YOUR_PLUGIN_NAME_TYPE,
    typeMapper,
    // theme,
    // decorator: (theme, config) => ...
  };
};
