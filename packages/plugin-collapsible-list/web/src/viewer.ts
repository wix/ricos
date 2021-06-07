/*
  This module exports the required CreatePluginFunction for RicosViewer.
  If your plugin uses decorations, then make sure to uncomment 'decorator'.
  (Please find examples of usage in other plugins)
*/

import { typeMapper } from './typeMapper';
import { COLLAPSIBLE_LIST_TYPE, CollapsibleListPluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
import { ViewerPluginCreator } from 'wix-rich-content-common';
export { COLLAPSIBLE_LIST_TYPE, typeMapper as collapsibleListTypeMapper };

export const pluginCollapsibleList: ViewerPluginCreator<CollapsibleListPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: COLLAPSIBLE_LIST_TYPE,
    typeMapper,
    // decorator: (theme, config) => ...
  };
};
