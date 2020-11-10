import { typeMapper } from './typeMapper';
import { DEFAULT_COMPONENT_DATA } from './defaults';
import { POLL_TYPE } from './types';
export { typeMapper as pollTypeMapper, POLL_TYPE };

import { Shaul } from 'wix-rich-content-editor-common';
export { Shaul };
export const pluginPoll = (config = {}) => {
  return {
    config: { ...DEFAULT_COMPONENT_DATA.config, ...config },
    type: POLL_TYPE,
    typeMapper,
    a: Shaul,
  };
};
