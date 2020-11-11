import { createTextColorPlugin } from './createTextColorPlugin';
import { createTextHighlightPlugin } from './createTextHighlightPlugin';
import {
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  TextColorPluginEditorConfig,
  TextHighlightPluginEditorConfig,
} from './types';
import { DEFAULTS } from './constants';
import { ModalsMap } from './modals';
import { EditorPlugin } from 'wix-rich-content-common';

export const pluginTextColor: EditorPlugin<TextColorPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.configTextColor.editor, ...config },
    type: TEXT_COLOR_TYPE,
    createPlugin: createTextColorPlugin,
    ModalsMap,
  };
};

export const pluginTextHighlight: EditorPlugin<TextHighlightPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.configTextHighlight.editor, ...config },
    type: TEXT_HIGHLIGHT_TYPE,
    createPlugin: createTextHighlightPlugin,
    ModalsMap: {},
  };
};
