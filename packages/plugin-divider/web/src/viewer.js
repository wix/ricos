import { typeMapper } from './typeMapper';
import { DIVIDER_TYPE } from './constants';
export { typeMapper as dividerTypeMapper, DIVIDER_TYPE };

const defaultConfig = {};
export const rcvDivider = (config = {}) => {
  return {
    config: { ...defaultConfig, ...config },
    type: DIVIDER_TYPE,
    typeMapper,
    decorator: {},
  };
};
