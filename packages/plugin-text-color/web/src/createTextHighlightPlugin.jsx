import { createBasePlugin } from 'wix-rich-content-editor-common';
import { TEXT_HIGHLIGHT_TYPE } from './types';
import { createTextHighlightToolbar } from './toolbar/createToolbar';
import { DEFAULT_BACKGROUND_STYLE_FN_DRAFT } from './constants';
import { isTextHighlight, styleFnFilter } from './text-decorations-utils';

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
      (settings.customStyleFn && styleFnFilter(settings.customStyleFn, isTextHighlight)) ||
      DEFAULT_BACKGROUND_STYLE_FN_DRAFT,
    ...rest,
  });
};

export { createTextHighlightPlugin };
