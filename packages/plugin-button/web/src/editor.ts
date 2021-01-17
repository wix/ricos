import { createActionButtonPlugin, createLinkButtonPlugin } from './createButtonPlugin';
import { DEFAULT_CONFIG } from './constants';
import {
  LINK_BUTTON_TYPE,
  ACTION_BUTTON_TYPE,
  LinkButtonPluginEditorConfig,
  ActionButtonPluginEditorConfig,
} from './types';
import { theme, getDefaultComponentData } from './defaults';

import { ModalsMap } from './modals';
import { EditorPluginCreator } from 'wix-rich-content-common';

const pluginButton = (createPlugin, type, config) => {
  const pluginConfig = { ...DEFAULT_CONFIG, ...config };
  const { relValue, anchorTarget } = pluginConfig;
  const rel = relValue === '_nofollow';
  const target = anchorTarget ? anchorTarget === '_blank' : true;

  return {
    config: pluginConfig,
    type,
    createPlugin,
    ModalsMap,
    theme,
    componentData: getDefaultComponentData(rel, target),
  };
};

export const pluginLinkButton: EditorPluginCreator<LinkButtonPluginEditorConfig> = config => {
  return pluginButton(createLinkButtonPlugin, LINK_BUTTON_TYPE, config);
};

export const pluginActionButton: EditorPluginCreator<ActionButtonPluginEditorConfig> = config => {
  return pluginButton(createActionButtonPlugin, ACTION_BUTTON_TYPE, config);
};
