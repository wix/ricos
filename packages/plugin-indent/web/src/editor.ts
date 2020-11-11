import { createIndentPlugin } from './createIndentPlugin';
import { INDENT_TYPE, IndentPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPlugin } from 'wix-rich-content-common';

export const pluginIndent: EditorPlugin<IndentPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: INDENT_TYPE,
    createPlugin: createIndentPlugin,
  };
};
