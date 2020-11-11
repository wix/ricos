/*
  This module exports the required CreatePluginFunction for RicosViewer.
  If your plugin uses decorations, then make sure to uncomment 'decorator'.
  (Please find examples of usage in other plugins)
*/

import { typeMapper } from './typeMapper';
import { ACCORDION_TYPE, AccordionPluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
import { ViewerPluginFunction } from 'wix-rich-content-common';
export { ACCORDION_TYPE, typeMapper as accordionTypeMapper };

export const pluginAccordion: ViewerPluginFunction<AccordionPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: ACCORDION_TYPE,
    typeMapper,
    // decorator: (theme, config) => ...
  };
};
