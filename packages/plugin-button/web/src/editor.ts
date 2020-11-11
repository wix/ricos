import { createActionButtonPlugin, createLinkButtonPlugin } from './createButtonPlugin';
import { DEFAULT_CONFIG } from './constants';
import {
  LINK_BUTTON_TYPE,
  ACTION_BUTTON_TYPE,
  LinkButtonPluginEditorConfig,
  ActionButtonPluginEditorConfig,
} from './types';
import { theme } from './defaults';
import { ModalsMap } from './modals';
import { EditorPlugin } from 'wix-rich-content-common';

const pluginButton = (createPlugin, type, config) => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type,
    createPlugin,
    ModalsMap,
    theme,
  };
};

export const pluginLinkButton: EditorPlugin<LinkButtonPluginEditorConfig> = config => {
  return pluginButton(createLinkButtonPlugin, LINK_BUTTON_TYPE, config);
};

export const pluginActionButton: EditorPlugin<ActionButtonPluginEditorConfig> = config => {
  return pluginButton(createActionButtonPlugin, ACTION_BUTTON_TYPE, config);
};
