import {
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  TextColorPluginViewerConfig,
  TextHighlightPluginViewerConfig,
} from './types';
import { textColorInlineStyleMapper } from './textColorInlineStyleMapper';
import { textHighlightInlineStyleMapper } from './textHighlightInlineStyleMapper';
import { DEFAULTS } from './constants';
import { ViewerPlugin } from 'wix-rich-content-common';
export {
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  textColorInlineStyleMapper,
  textHighlightInlineStyleMapper,
};

export const pluginTextColor: ViewerPlugin<TextColorPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.configTextColor.viewer, ...config },
    type: TEXT_COLOR_TYPE,
    inlineStyleMapper: textColorInlineStyleMapper,
  };
};

export const pluginTextHighlight: ViewerPlugin<TextHighlightPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.configTextHighlight.viewer, ...config },
    type: TEXT_HIGHLIGHT_TYPE,
    inlineStyleMapper: textHighlightInlineStyleMapper,
  };
};
