import { createBasePlugin } from 'wix-rich-content-common';
import { TEXT_COLOR_TYPE } from './types';
import createTextColorToolbar from './toolbar/createTextColorToolbar';
import { DEFAULT_STYLE_FN_DRAFT } from './constants';

const createTextColorPlugin = (config = {}) => {
  const type = TEXT_COLOR_TYPE;
  const { theme, [type]: settings = {}, ...rest } = config;
  const toolbar = createTextColorToolbar(config);

  return createBasePlugin({
    theme,
    toolbar,
    type,
    settings,
    customStyleFn: settings.customStyleFn || DEFAULT_STYLE_FN_DRAFT,
    ...rest,
  });
};

export { createTextColorPlugin };
