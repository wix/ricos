import { typeMapper } from './typeMapper';
import { BUTTON_TYPE } from './constants';
export { typeMapper as buttonTypeMapper, BUTTON_TYPE };

const defaultConfig = {};

export const pluginButton = (config = {}) => {
  return {
    config: { ...defaultConfig, ...config },
    type: BUTTON_TYPE,
    typeMapper,
    decorator: {},
  };
};
