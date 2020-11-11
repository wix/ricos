import { createDividerPlugin } from './createDividerPlugin';
import { DEFAULTS } from './defaults';
import { DIVIDER_TYPE, DividerPluginEditorConfig } from './types';
import { EditorPlugin } from 'wix-rich-content-common';

export const pluginDivider: EditorPlugin<DividerPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: DIVIDER_TYPE,
    createPlugin: createDividerPlugin,
    ModalsMap: {},
  };
};
