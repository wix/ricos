import { INDENT_TYPE } from './types';
import { DEFAULTS } from './defaults';
export { INDENT_TYPE };

export const pluginIndent = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: INDENT_TYPE,
  };
};
