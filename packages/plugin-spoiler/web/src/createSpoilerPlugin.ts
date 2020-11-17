import createToolbar from './toolbar/createToolbar';
import { SPOILER_TYPE, SpoilerPluginEditorConfig } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { styleFnFilter } from './spoilerUtilsFn';
import spoilerEditorWrapper from './spoilerEditorWrapper';
import { CreatePluginFunction } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

// TODO: fix this
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createSpoilerPlugin: CreatePluginFunction<SpoilerPluginEditorConfig> | any = config => {
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

createSpoilerPlugin.spoilerEditorWrapper = spoilerEditorWrapper;

export { createSpoilerPlugin };
