import { LINK_TYPE } from './types';
import { typeMapper } from './typeMapper';
import { DEFAULTS, THEME as theme } from './defaults';
export { typeMapper as linkTypeMapper, LINK_TYPE };
export { default as LinkViewer } from './LinkViewer';

export const pluginLink = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINK_TYPE,
    typeMapper,
    theme,
  };
};
