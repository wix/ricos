import {
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  TextColorPluginViewerConfig,
  TextHighlightPluginViewerConfig,
} from './types';
import { textColorInlineStyleMapper } from './textColorInlineStyleMapper';
import { textHighlightInlineStyleMapper } from './textHighlightInlineStyleMapper';
import { DEFAULTS } from './constants';
import { ViewerPluginFunction } from 'wix-rich-content-common';
export {
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  textColorInlineStyleMapper,
  textHighlightInlineStyleMapper,
};

export const pluginTextColor: ViewerPluginFunction<TextColorPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.configTextColor.viewer, ...config },
    type: TEXT_COLOR_TYPE,
    inlineStyleMapper: textColorInlineStyleMapper,
  };
};

export const pluginTextHighlight: ViewerPluginFunction<TextHighlightPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.configTextHighlight.viewer, ...config },
    type: TEXT_HIGHLIGHT_TYPE,
    inlineStyleMapper: textHighlightInlineStyleMapper,
  };
};
