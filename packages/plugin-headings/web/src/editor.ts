import { createHeadingsPlugin } from './createHeadingsPlugin';
import { HEADINGS_DROPDOWN_TYPE, HeadingsPluginEditorConfig } from './types';
import { ModalsMap } from './modals';
import { EditorPlugin } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

export const pluginHeadings: EditorPlugin<HeadingsPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HEADINGS_DROPDOWN_TYPE,
    createPlugin: createHeadingsPlugin,
    ModalsMap,
  };
};
