import { typeMapper } from './typeMapper';
import { getDefaultsSettings, theme } from './defaults';
import { TABLE_TYPE, TablePluginViewerConfig } from './types';
import { ViewerPluginCreator } from 'wix-rich-content-common';
export { TABLE_TYPE, typeMapper as tableTypeMapper };

export const pluginTable: ViewerPluginCreator<TablePluginViewerConfig> = config => {
  return {
    config: { ...getDefaultsSettings().config, ...config },
    type: TABLE_TYPE,
    typeMapper,
    // decorator: (theme, config) => ...
    theme,
  };
};
