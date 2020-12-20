import createToolbar from './toolbar/createToolbar';
import { mergeStyles, CreatePluginFunction, CreatePluginConfig } from 'wix-rich-content-common';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';

import {
  LINK_BUTTON_TYPE,
  ACTION_BUTTON_TYPE,
  LinkButtonPluginEditorConfig,
  ActionButtonPluginEditorConfig,
  ButtonPluginEditorConfig,
} from './types';
import { getDefaultComponentData } from './defaults';

import Styles from '../statics/styles/default-styles.scss';
import ButtonComponent from './components/button-component';

const createLinkButtonPlugin: CreatePluginFunction<LinkButtonPluginEditorConfig> = config => {
  return createButtonPlugin(LINK_BUTTON_TYPE, config);
};

const createActionButtonPlugin: CreatePluginFunction<ActionButtonPluginEditorConfig> = config => {
  return createButtonPlugin(ACTION_BUTTON_TYPE, config);
};

const createButtonPlugin = (
  type: typeof LINK_BUTTON_TYPE | typeof ACTION_BUTTON_TYPE,
  config: CreatePluginConfig<ButtonPluginEditorConfig>
) => {
  const {
    helpers,
    theme,
    t,
    anchorTarget,
    relValue,
    isMobile,
    [type]: settings = {},
    ...rest
  } = config;
  settings.isActionButton = type === ACTION_BUTTON_TYPE;
  const styles = mergeStyles({ styles: Styles, theme });
  const rel = relValue === '_nofollow';
  const target = anchorTarget ? anchorTarget === '_blank' : true;
  const customTooltip = settings.insertButtonTooltip;
  return createBasePlugin({
    component: ButtonComponent,
    settings,
    theme,
    type,
    anchorTarget,
    relValue,
    toolbar: createToolbar({
      settings,
      helpers,
      styles,
      t,
      isMobile,
      customTooltip,
    }),
    helpers,
    t,
    defaultPluginData: getDefaultComponentData(rel, target),
    isMobile,
    ...rest,
  });
};

export { createLinkButtonPlugin, createActionButtonPlugin, LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE };
