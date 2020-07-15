import { LINE_SPACING_TYPE } from './types';

export const pluginLineSpacing = (config = {}) => {
  return {
    config,
    type: LINE_SPACING_TYPE,
  };
};
