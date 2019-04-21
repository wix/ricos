import { createBasePlugin } from 'wix-rich-content-common';
import { TEXT_COLOR_TYPE } from './types';
import { isHexColor } from './utils';
import createTextColorToolbar from './toolbar/createTextColorToolbar';

const customStyleFn = styles =>
  styles
    .toArray()
    .reduce(
      (cssStyle, style) => ({ ...cssStyle, ...(isHexColor(style) ? { color: style } : {}) }),
      {}
    );

const createTextColorPlugin = (config = {}) => {
  const type = TEXT_COLOR_TYPE;
  const { theme, [type]: settings = {}, ...rest } = config;
  const toolbar = createTextColorToolbar(config);

  return createBasePlugin({
    theme,
    toolbar,
    type,
    settings,
    customStyleFn,
    ...rest,
  });
};

export { createTextColorPlugin };
