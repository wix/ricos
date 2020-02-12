import { typeMapper } from './typeMapper';
import { HTML_TYPE } from './types';
import { getBaseUrl } from './util';
export { typeMapper as htmlTypeMapper, HTML_TYPE };

const defaultConfig = {
  htmlIframeSrc: `${getBaseUrl()}/static/html-plugin-embed.html`,
};

export const pluginHtml = (config = {}) => {
  return {
    config: { ...defaultConfig, ...config },
    type: HTML_TYPE,
    typeMapper,
    decorator: {},
  };
};
