import { createIndentPlugin } from './createIndentPlugin';
import { INDENT_TYPE, IndentPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPluginFunction } from 'wix-rich-content-common';

export const pluginIndent: EditorPluginFunction<IndentPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: INDENT_TYPE,
    createPlugin: createIndentPlugin,
  };
};
