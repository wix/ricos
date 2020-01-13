import { typeMapper } from './typeMapper';
import { IMAGE_TYPE } from './types';
export { typeMapper as imageTypeMapper, IMAGE_TYPE };

const defaultConfig = {};

export const rcvGallery = (config = {}) => {
  return {
    config: { ...defaultConfig, ...config },
    type: IMAGE_TYPE,
    typeMapper,
    decorator: {},
  };
};
