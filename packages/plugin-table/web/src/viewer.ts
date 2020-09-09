/*
  This module exports the required CreatePluginFunction for RicosViewer.
  If your plugin uses decorations, then make sure to uncomment 'decorator'.
  (Please find examples of usage in other plugins)
*/

import { typeMapper } from './typeMapper';
import { TABLE_TYPE } from './types';
import { DEFAULTS, theme } from './defaults';
export { TABLE_TYPE, typeMapper as tableTypeMapper };

export const pluginTable = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: TABLE_TYPE,
    typeMapper,
    // decorator: (theme, config) => ...
    theme,
  };
};
