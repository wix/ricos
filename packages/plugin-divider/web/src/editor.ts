import { createDividerPlugin } from './createDividerPlugin';
import { DEFAULTS } from './defaults';
import { DIVIDER_TYPE, DividerPluginEditorConfig } from './types';
import { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginDivider: EditorPluginCreator<DividerPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: DIVIDER_TYPE,
    createPlugin: createDividerPlugin,
    ModalsMap: {},
  };
};
