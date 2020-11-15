import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { TEXT_HIGHLIGHT_TYPE, TextHighlightPluginEditorConfig } from './types';
import { createTextHighlightToolbar } from './toolbar/createToolbar';
import { DEFAULT_BACKGROUND_STYLE_FN_DRAFT, DEFAULTS } from './constants';
import { isTextHighlight, styleFnFilter } from './text-decorations-utils';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createTextHighlightPlugin: CreatePluginFunction<TextHighlightPluginEditorConfig> = config => {
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
    defaultPluginData: DEFAULTS.configTextHighlight.editor,
    ...rest,
  });
};

export { createTextHighlightPlugin };
