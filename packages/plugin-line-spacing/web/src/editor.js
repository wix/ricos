import { createLineSpacingPlugin } from './createLineSpacingPlugin';
import { LINE_SPACING_TYPE } from './types';
import { ModalsMap } from './modals';
import { DEFAULTS } from './defaults';

export const pluginLineSpacing = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINE_SPACING_TYPE,
    createPlugin: createLineSpacingPlugin,
    ModalsMap,
  };
};
