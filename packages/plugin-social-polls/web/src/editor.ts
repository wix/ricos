import { createPollPlugin } from './createPollPlugin';
import { POLL_TYPE } from './types';
import { DEFAULT_COMPONENT_DATA, theme } from './defaults';
import { ModalsMap } from './modals';

export const pluginPoll = (config = {}) => {
  return {
    config: { ...DEFAULT_COMPONENT_DATA.config, ...config },
    type: POLL_TYPE,
    createPlugin: createPollPlugin,
    ModalsMap,
    theme,
  };
};
