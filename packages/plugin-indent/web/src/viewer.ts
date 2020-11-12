import { INDENT_TYPE, IndentPluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
import { ViewerPluginCreator } from 'wix-rich-content-common';
export { INDENT_TYPE };

export const pluginIndent: ViewerPluginCreator<IndentPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: INDENT_TYPE,
  };
};
