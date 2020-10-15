import { createIndentPlugin } from './createIndentPlugin';
import { INDENT_TYPE } from './types';
import { DEFAULTS } from './defaults';

export const pluginIndent = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: INDENT_TYPE,
    createPlugin: createIndentPlugin,
  };
};
