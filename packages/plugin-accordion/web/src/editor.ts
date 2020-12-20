import { createAccordionPlugin } from './createAccordionPlugin';
import { ACCORDION_TYPE, AccordionPluginEditorConfig } from './types';
import { ModalsMap } from './modals';
import { DEFAULTS } from './defaults';
import { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginAccordion: EditorPluginCreator<AccordionPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: ACCORDION_TYPE,
    createPlugin: createAccordionPlugin,
    ModalsMap,
  };
};
