import { createTextColorPlugin } from './createTextColorPlugin';
import { createTextHighlightPlugin } from './createTextHighlightPlugin';
import { TEXT_COLOR_TYPE, TEXT_HIGHLIGHT_TYPE } from './types';
import { DEFAULTS } from './constants';
import { ModalsMap } from './modals';

export const pluginTextColor = (config = {}) => {
  return {
    config: { ...DEFAULTS.configTextColor, ...config },
    type: TEXT_COLOR_TYPE,
    createPlugin: createTextColorPlugin,
    ModalsMap,
  };
};

export const pluginTextHighlight = (config = {}) => {
  return {
    config: { ...DEFAULTS.configTextHighlight, ...config },
    type: TEXT_HIGHLIGHT_TYPE,
    createPlugin: createTextHighlightPlugin,
    ModalsMap: {},
  };
};
