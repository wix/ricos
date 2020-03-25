import { typeMapper } from './typeMapper';
import { BUTTON_TYPE, DEFAULT_CONFIG, THEME as theme } from './constants';
export { typeMapper as buttonTypeMapper, BUTTON_TYPE };
export const pluginButton = (config = {}) => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type: BUTTON_TYPE,
    typeMapper,
    theme,
  };
};
