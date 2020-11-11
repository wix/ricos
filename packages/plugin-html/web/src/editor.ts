import { createHtmlPlugin } from './createHtmlPlugin';
import { HTML_TYPE, HtmlPluginEditorConfig } from './types';
import { DEFAULTS_CONFIG } from './defaults';
import { EditorPluginFunction } from 'wix-rich-content-common';

export const pluginHtml: EditorPluginFunction<HtmlPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS_CONFIG, ...config },
    type: HTML_TYPE,
    createPlugin: createHtmlPlugin,
    ModalsMap: {},
  };
};
