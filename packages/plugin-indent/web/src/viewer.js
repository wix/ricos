import { typeMapper } from './typeMapper';
import { INDENT_TYPE } from './types';
import { DEFAULTS, THEME as theme } from './defaults';
export { INDENT_TYPE, typeMapper as indentTypeMapper };

export const pluginIndent = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: INDENT_TYPE,
    typeMapper,
    theme,
  };
};
