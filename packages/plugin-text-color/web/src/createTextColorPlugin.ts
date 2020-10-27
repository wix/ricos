import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { TEXT_COLOR_TYPE } from './types';
import { createTextColorToolbar } from './toolbar/createToolbar';
import { DEFAULT_FOREGROUND_STYLE_FN_DRAFT, DEFAULTS } from './constants';
import { isTextColor, styleFnFilter } from './text-decorations-utils';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createTextColorPlugin: CreatePluginFunction = config => {
  const type = TEXT_COLOR_TYPE;
  const { theme, [type]: settings = {}, ...rest } = config;
  const toolbar = createTextColorToolbar(config);
  return createBasePlugin({
    theme,
    toolbar,
    type,
    settings,
    customStyleFn:
      (settings.customStyleFn && styleFnFilter(settings.customStyleFn, isTextColor)) ||
      DEFAULT_FOREGROUND_STYLE_FN_DRAFT,
    defaultPluginData: DEFAULTS.configTextColor.editor,
    ...rest,
  });
};

export { createTextColorPlugin };
