import { createTablePlugin } from './createTablePlugin';
import { TABLE_TYPE } from './types';
import { ModalsMap } from './modals';
import { getDefaultsSettings, theme } from './defaults';

export const pluginTable = (config = {}) => {
  return {
    config: { ...getDefaultsSettings().config, ...config },
    type: TABLE_TYPE,
    createPlugin: createTablePlugin,
    ModalsMap,
    theme,
  };
};
