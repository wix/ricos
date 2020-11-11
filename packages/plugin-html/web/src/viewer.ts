import { typeMapper } from './typeMapper';
import { HTML_TYPE, HtmlPluginViewerConfig } from './types';
import { DEFAULTS_VIEWER } from './defaults';
import { ViewerPluginFunction } from 'wix-rich-content-common';
export { typeMapper as htmlTypeMapper, HTML_TYPE };

export const pluginHtml: ViewerPluginFunction<HtmlPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS_VIEWER, ...config },
    type: HTML_TYPE,
    typeMapper,
  };
};
