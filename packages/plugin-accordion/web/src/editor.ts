/*
  This module exports the required CreatePluginFunction for RicosEditor.
  If your plugin uses a modal, then make sure to uncomment 'ModalsMap'.
*/

import { createAccordionPlugin } from './createAccordionPlugin';
import { ACCORDION_TYPE } from './types';
// import { ModalsMap } from './modals';
import { DEFAULTS, theme } from './defaults';

export const pluginAccordion = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: ACCORDION_TYPE,
    createPlugin: createAccordionPlugin,
    // ModalsMap,
    theme,
  };
};
