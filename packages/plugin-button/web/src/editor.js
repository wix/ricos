import { createButtonPlugin } from './createButtonPlugin';
import { BUTTON_TYPE, DEFAULT_CONFIG } from './constants';
import { ModalsMap } from './modals';

export const pluginButton = (config = {}) => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type: BUTTON_TYPE,
    createPlugin: createButtonPlugin,
    ModalsMap,
  };
};
