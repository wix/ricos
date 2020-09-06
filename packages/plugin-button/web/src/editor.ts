import { createActionButtonPlugin, createLinkButtonPlugin } from './createButtonPlugin';
import { LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE, DEFAULT_CONFIG } from './constants';
import { THEME as theme } from './defaults';
import { ModalsMap } from './modals';

const pluginButton = (createPlugin, type, config) => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type,
    createPlugin,
    ModalsMap,
    theme,
  };
};

export const pluginLinkButton = (config = {}) => {
  return pluginButton(createLinkButtonPlugin, LINK_BUTTON_TYPE, config);
};

export const pluginActionButton = (config = {}) => {
  return pluginButton(createActionButtonPlugin, ACTION_BUTTON_TYPE, config);
};
