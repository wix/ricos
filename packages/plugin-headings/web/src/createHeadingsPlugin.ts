import createToolbar from './toolbar/createToolbar';
import { HEADINGS_DROPDOWN_TYPE, HeadingsPluginEditorConfig } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { CreatePluginFunction } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

const createHeadingsPlugin: CreatePluginFunction<HeadingsPluginEditorConfig> = config => {
  const { helpers, t, [HEADINGS_DROPDOWN_TYPE]: settings = {}, isMobile, ...rest } = config;
  return createBasePlugin({
    toolbar: createToolbar(config),
    helpers,
    settings,
    t,
    isMobile,
    type: HEADINGS_DROPDOWN_TYPE,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

export { createHeadingsPlugin };
