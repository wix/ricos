import { typeMapper } from './typeMapper';
import { HTML_TYPE } from './types';
import { DEFAULTS } from './constants';
export { typeMapper as htmlTypeMapper, HTML_TYPE };

export const pluginHtml = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HTML_TYPE,
    typeMapper,
    decorator: {},
  };
};
