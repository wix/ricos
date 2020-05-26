import { createLineSpacingPlugin } from './createLineSpacingPlugin';
import { LINE_SPACING_TYPE } from './types';
import { ModalsMap } from './modals';

export const pluginLineSpacing = (config = {}) => {
  return {
    config,
    type: LINE_SPACING_TYPE,
    createPlugin: createLineSpacingPlugin,
    ModalsMap,
  };
};
