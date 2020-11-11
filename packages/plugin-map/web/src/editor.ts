import { createMapPlugin } from './createMapPlugin';
import { DEFAULTS } from './defaults';
import { MAP_TYPE, MapPluginEditorConfig } from './types';
import { EditorPluginFunction } from 'wix-rich-content-common';

export const pluginMap: EditorPluginFunction<MapPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: MAP_TYPE,
    createPlugin: createMapPlugin,
    ModalsMap: {},
  };
};
