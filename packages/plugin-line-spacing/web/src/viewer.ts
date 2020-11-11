import { LINE_SPACING_TYPE, LineSpacingPluginViewerConfig } from './types';
import { ViewerPlugin } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

export const pluginLineSpacing: ViewerPlugin<LineSpacingPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINE_SPACING_TYPE,
  };
};
