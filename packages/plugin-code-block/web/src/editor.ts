import { createCodeBlockPlugin } from './createCodeBlockPlugin';
import { CODE_BLOCK_TYPE, CodeBlockPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPluginFunction } from 'wix-rich-content-common';

export const pluginCodeBlock: EditorPluginFunction<CodeBlockPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: CODE_BLOCK_TYPE,
    createPlugin: createCodeBlockPlugin,
    ModalsMap: {},
  };
};
