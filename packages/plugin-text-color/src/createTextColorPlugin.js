import { createBasePlugin, isHexColor } from 'wix-rich-content-common';
import { TEXT_COLOR_TYPE } from './types';
import createTextColorToolbar from './toolbar/createTextColorToolbar';

const defaultStyleFn = styles =>
  styles
    .toArray()
    .reduce(
      (cssStyle, style) => ({ ...cssStyle, ...(isHexColor(style) ? { color: style } : {}) }),
      {}
    );

const createTextColorPlugin = (config = {}) => {
  const type = TEXT_COLOR_TYPE;
  const { theme, [type]: settings = {}, customStyleFn, ...rest } = config;
  const toolbar = createTextColorToolbar(config);

  return createBasePlugin({
    theme,
    toolbar,
    type,
    settings,
    customStyleFn: customStyleFn || defaultStyleFn,
    ...rest,
  });
};

export { createTextColorPlugin };
