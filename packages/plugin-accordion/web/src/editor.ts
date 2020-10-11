import { createAccordionPlugin } from './createAccordionPlugin';
import { ACCORDION_TYPE } from './types';
import { ModalsMap } from './modals';
import { DEFAULTS } from './defaults';

export const pluginAccordion = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: ACCORDION_TYPE,
    createPlugin: createAccordionPlugin,
    ModalsMap,
  };
};
