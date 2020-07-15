import { typeMapper } from './typeMapper';
import { DIVIDER_TYPE, DEFAULTS, THEME as theme } from './constants';
export { typeMapper as dividerTypeMapper, DIVIDER_TYPE };

export const pluginDivider = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: DIVIDER_TYPE,
    typeMapper,
    theme,
  };
};
