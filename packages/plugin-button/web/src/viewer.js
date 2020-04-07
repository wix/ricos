import { typeMapper } from './typeMapper';
import { BUTTON_TYPE, DEFAULT_CONFIG } from './constants';
import { createTheme as theme } from './defaults';
export { typeMapper as buttonTypeMapper, BUTTON_TYPE };
export const pluginButton = (config = {}) => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type: BUTTON_TYPE,
    typeMapper,
    theme,
  };
};
