import { createLineSpacingPlugin } from './createLineSpacingPlugin';
import { LINE_SPACING_TYPE, LineSpacingPluginEditorConfig } from './types';
import { ModalsMap } from './modals';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

export const pluginLineSpacing: EditorPluginCreator<LineSpacingPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINE_SPACING_TYPE,
    createPlugin: createLineSpacingPlugin,
    ModalsMap,
  };
};
