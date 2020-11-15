import createToolbar from './toolbar/createToolbar';
import { SPOILER_TYPE, SpoilerPluginEditorConfig } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { styleFnFilter } from './spoilerUtilsFn';
import { CreatePluginFunction } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

const createSpoilerPlugin: CreatePluginFunction<SpoilerPluginEditorConfig> = config => {
  const { helpers, t, [SPOILER_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    type: SPOILER_TYPE,
    toolbar: createToolbar(config),
    helpers,
    settings,
    t,
    isMobile,
    disableRightClick: config?.uiSettings?.disableRightClick,
    customStyleFn: styleFnFilter(),
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

export { createSpoilerPlugin };
