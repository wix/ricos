import { typeMapper } from './typeMapper';
import { TABLE_TYPE } from './types';
import { getDefaultsSettings, theme } from './defaults';
export { TABLE_TYPE, typeMapper as tableTypeMapper };

export const pluginTable = (config = {}) => {
  return {
    config: { ...getDefaultsSettings().config, ...config },
    type: TABLE_TYPE,
    typeMapper,
    // decorator: (theme, config) => ...
    theme,
  };
};
