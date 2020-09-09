/*
  This module exports the required CreatePluginFunction for RicosViewer.
  If your plugin uses decorations, then make sure to uncomment 'decorator'.
  (Please find examples of usage in other plugins)
*/

import { typeMapper } from './typeMapper';
import { YOUR_PLUGIN_NAME_TYPE } from './types';
import { DEFAULTS, theme } from './defaults';
export { YOUR_PLUGIN_NAME_TYPE, typeMapper as yourPluginNameTypeMapper };

export const pluginYourPluginName = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: YOUR_PLUGIN_NAME_TYPE,
    typeMapper,
    // decorator: (theme, config) => ...
    theme,
  };
};
