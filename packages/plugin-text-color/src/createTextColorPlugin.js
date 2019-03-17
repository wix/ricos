import { createBasePlugin } from 'wix-rich-content-common';
import { TEXT_COLOR_TYPE } from './types';
import createTextColorToolbar from './toolbar/createTextColorToolbar';

const createTextColorPlugin = (config = {}) => {
  const type = TEXT_COLOR_TYPE;
  const { theme, [type]: settings = {}, ...rest } = config;
  const toolbar = createTextColorToolbar(config);

  return createBasePlugin({
    theme,
    toolbar,
    type,
    settings,
    ...rest,
  });
};

export { createTextColorPlugin };
