import { typeMapper } from './typeMapper';
import { DEFAULTS } from './defaults';
import { DIVIDER_TYPE, DividerPluginViewerConfig } from './types';
import { ViewerPluginCreator } from 'wix-rich-content-common';
import pluginRenderer from './pluginRenderer';

export { typeMapper as dividerTypeMapper, DIVIDER_TYPE };

export const pluginDivider: ViewerPluginCreator<DividerPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: DIVIDER_TYPE,
    typeMapper,
    pluginRenderer,
  };
};
