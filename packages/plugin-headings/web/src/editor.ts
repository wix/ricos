import { createHeadingsPlugin } from './createHeadingsPlugin';
import { HEADINGS_DROPDOWN_TYPE, HeadingsPluginEditorConfig } from './types';
import { ModalsMap } from './modals';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

export const pluginHeadings: EditorPluginCreator<HeadingsPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HEADINGS_DROPDOWN_TYPE,
    createPlugin: createHeadingsPlugin,
    ModalsMap,
  };
};
