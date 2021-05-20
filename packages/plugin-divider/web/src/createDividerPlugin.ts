import { mergeStyles, CreatePluginFunction } from 'wix-rich-content-common';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';

import { DEFAULTS } from './defaults';
import { DIVIDER_TYPE, DividerPluginEditorConfig } from './types';
import DividerComponent from './components/divider-component';
import createToolbar from './toolbar/createToolbar';
import Styles from '../statics/styles/default-styles.scss';

const createDividerPlugin: CreatePluginFunction<DividerPluginEditorConfig> = config => {
  const type = DIVIDER_TYPE;
  const { helpers, theme, t, [type]: settings = {}, ...rest } = config;

  const styles = mergeStyles({ styles: Styles, theme });

  return createBasePlugin({
    component: DividerComponent,
    settings,
    theme,
    type,
    toolbar: createToolbar({
      settings,
      helpers,
      styles,
      theme,
      t,
    }),
    helpers,
    t,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

const createDividerPlugin2 = (config = {}) => {
  const type = DIVIDER_TYPE;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { helpers, theme, t, [type]: settings = {}, ...rest } = config;

  const styles = mergeStyles({ styles: Styles, theme });

  return {
    component: DividerComponent,
    props: {
      settings,
      theme,
      type,
      toolbar: createToolbar({
        settings,
        helpers,
        styles,
        theme,
        t,
      }),
      helpers,
      t,
      defaultPluginData: DEFAULTS,
      ...rest,
    },
  };
};

createDividerPlugin.functionName = DIVIDER_TYPE;

export { createDividerPlugin, DIVIDER_TYPE, createDividerPlugin2 };
