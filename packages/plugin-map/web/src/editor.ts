import { createMapPlugin } from './createMapPlugin';
import { DEFAULTS } from './defaults';
import { MAP_TYPE, MapPluginEditorConfig } from './types';
import { EditorPlugin } from 'wix-rich-content-common';

export const pluginMap: EditorPlugin<MapPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: MAP_TYPE,
    createPlugin: createMapPlugin,
    ModalsMap: {},
  };
};
