import { createHtmlPlugin } from './createHtmlPlugin';
import { HTML_TYPE, HtmlPluginEditorConfig } from './types';
import { DEFAULTS_CONFIG, defaults } from './defaults';
import { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginHtml: EditorPluginCreator<HtmlPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS_CONFIG, ...config },
    type: HTML_TYPE,
    createPlugin: createHtmlPlugin,
    ModalsMap: {},
    componentData: defaults(),
  };
};
