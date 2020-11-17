import { typeMapper } from './typeMapper';
import { DEFAULT_CONFIG } from './constants';
import {
  LINK_BUTTON_TYPE,
  ACTION_BUTTON_TYPE,
  LinkButtonPluginEditorConfig,
  ActionButtonPluginEditorConfig,
} from './types';
import { theme } from './defaults';
import { ViewerPluginCreator } from 'wix-rich-content-common';
export { typeMapper as buttonTypeMapper, LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE };

const pluginButton = (type, config) => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type,
    typeMapper,
    theme,
  };
};

export const pluginLinkButton: ViewerPluginCreator<LinkButtonPluginEditorConfig> = config => {
  return pluginButton(LINK_BUTTON_TYPE, config);
};

export const pluginActionButton: ViewerPluginCreator<ActionButtonPluginEditorConfig> = config => {
  return pluginButton(ACTION_BUTTON_TYPE, config);
};
