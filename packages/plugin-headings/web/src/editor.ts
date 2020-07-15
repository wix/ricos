import { createHeadingsPlugin } from './createHeadingsPlugin';
import { HEADINGS_DROPDOWN_TYPE } from './types';
import { ModalsMap } from './modals';

export const pluginHeadings = (config = {}) => {
  return {
    config,
    type: HEADINGS_DROPDOWN_TYPE,
    createPlugin: createHeadingsPlugin,
    ModalsMap,
  };
};
