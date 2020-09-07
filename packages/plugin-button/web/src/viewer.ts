import { typeMapper } from './typeMapper';
import { LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE, DEFAULT_CONFIG } from './constants';
import { theme } from './defaults';
export { typeMapper as buttonTypeMapper, LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE };

const pluginButton = (type, config) => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type,
    typeMapper,
    theme,
  };
};

export const pluginLinkButton = (config = {}) => {
  return pluginButton(LINK_BUTTON_TYPE, config);
};

export const pluginActionButton = (config = {}) => {
  return pluginButton(ACTION_BUTTON_TYPE, config);
};
