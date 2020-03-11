import { typeMapper } from './typeMapper';
import { HTML_TYPE } from './types';
import { DEFAULTS_VIEWER } from './constants';
export { typeMapper as htmlTypeMapper, HTML_TYPE };

export const pluginHtml = (config = {}) => {
  return {
    config: { ...DEFAULTS_VIEWER, ...config },
    type: HTML_TYPE,
    typeMapper,
  };
};
