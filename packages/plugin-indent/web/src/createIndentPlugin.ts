import createToolbar from './toolbar/createToolbar';
import { INDENT_TYPE, IndentPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createIndentPlugin: CreatePluginFunction<IndentPluginEditorConfig> = config => {
  const { helpers, t, [INDENT_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    type: INDENT_TYPE,
    toolbar: createToolbar(config),
    helpers,
    settings,
    t,
    isMobile,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

export { createIndentPlugin };
