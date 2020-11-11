import { createDividerPlugin } from './createDividerPlugin';
import { DEFAULTS } from './defaults';
import { DIVIDER_TYPE, DividerPluginEditorConfig } from './types';
import { EditorPluginFunction } from 'wix-rich-content-common';

export const pluginDivider: EditorPluginFunction<DividerPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: DIVIDER_TYPE,
    createPlugin: createDividerPlugin,
    ModalsMap: {},
  };
};
