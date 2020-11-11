import { INDENT_TYPE, IndentPluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
import { ViewerPluginFunction } from 'wix-rich-content-common';
export { INDENT_TYPE };

export const pluginIndent: ViewerPluginFunction<IndentPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: INDENT_TYPE,
  };
};
