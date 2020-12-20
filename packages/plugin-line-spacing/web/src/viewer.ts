import { LINE_SPACING_TYPE, LineSpacingPluginViewerConfig } from './types';
import { ViewerPluginCreator } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

export const pluginLineSpacing: ViewerPluginCreator<LineSpacingPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINE_SPACING_TYPE,
  };
};
