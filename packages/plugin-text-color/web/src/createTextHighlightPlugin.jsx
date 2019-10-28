import { createBasePlugin } from 'wix-rich-content-common';
import { TEXT_HIGHLIGHT_TYPE } from './types';
import { createTextHighlightToolbar } from './toolbar/createTextColorToolbar';
import { DEFAULT_BACKGROUND_STYLE_FN_DRAFT } from './constants';
import { isTextHighlight, customStyleFnWrapper } from './text-decorations-utils';

const createTextHighlightPlugin = (config = {}) => {
  const type = TEXT_HIGHLIGHT_TYPE;
  const { theme, [type]: settings = {}, ...rest } = config;
  const toolbar = createTextHighlightToolbar(config);
  return createBasePlugin({
    theme,
    toolbar,
    type,
    settings,
    customStyleFn:
      (settings.customStyleFn && customStyleFnWrapper(settings.customStyleFn, isTextHighlight)) ||
      DEFAULT_BACKGROUND_STYLE_FN_DRAFT,
    ...rest,
  });
};

export { createTextHighlightPlugin };
