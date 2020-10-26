import { createSpoilerPlugin } from './createSpoilerPlugin';
import { SPOILER_TYPE } from './types';

export const pluginSpoiler = (config = {}) => {
  return {
    config,
    type: SPOILER_TYPE,
    createPlugin: createSpoilerPlugin,
    ModalsMap: {},
  };
};
