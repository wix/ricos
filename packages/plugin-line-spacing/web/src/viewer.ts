import { LINE_SPACING_TYPE, LineSpacingPluginViewerConfig } from './types';
import { ViewerPluginFunction } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

export const pluginLineSpacing: ViewerPluginFunction<LineSpacingPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINE_SPACING_TYPE,
  };
};
