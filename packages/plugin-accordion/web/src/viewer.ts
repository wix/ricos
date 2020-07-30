/*
  This module exports the required CreatePluginFunction for RicosViewer.
  If your plugin uses decorations, then make sure to uncomment 'decorator'.
  (Please find examples of usage in other plugins)
*/

import { typeMapper } from './typeMapper';
import { ACCORDION_TYPE } from './types';
import { DEFAULTS, THEME as theme } from './defaults';
export { ACCORDION_TYPE, typeMapper as accordionTypeMapper };

export const pluginAccordion = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: ACCORDION_TYPE,
    typeMapper,
    // decorator: (theme, config) => ...
    theme,
  };
};
