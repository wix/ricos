import { typeMapper } from './typeMapper';
import { DEFAULTS } from './defaults';
import { DIVIDER_TYPE, DividerPluginViewerConfig } from './types';
import { ViewerPluginFunction } from 'wix-rich-content-common';
export { typeMapper as dividerTypeMapper, DIVIDER_TYPE };

export const pluginDivider: ViewerPluginFunction<DividerPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: DIVIDER_TYPE,
    typeMapper,
  };
};
