import { typeMapper } from './typeMapper';
import { IMAGE_TYPE } from './types';
import { DEFAULTS } from './consts';
export { typeMapper as imageTypeMapper, IMAGE_TYPE };

export const pluginImage = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: IMAGE_TYPE,
    typeMapper,
    decorator: {},
  };
};
