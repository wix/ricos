import { typeMapper } from './typeMapper';
import { theme, DEFAULTS } from './defaults';
import { TABLE_TYPE, TablePluginViewerConfig } from './types';
import { ViewerPluginCreator } from 'wix-rich-content-common';
export { TABLE_TYPE, typeMapper as tableTypeMapper };

export const pluginTable: ViewerPluginCreator<TablePluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: TABLE_TYPE,
    typeMapper,
    // decorator: (theme, config) => ...
    theme,
  };
};
