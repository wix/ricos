import { mergeStyles } from 'wix-rich-content-common';
import { createBasePlugin } from 'wix-rich-content-editor-common';

import { DIVIDER_TYPE, DEFAULTS } from './constants';
import DividerComponent from './components/divider-component';
import createToolbar from './toolbar';
import Styles from '../statics/styles/default-styles.scss';

const createDividerPlugin = (config = {}) => {
  const type = DIVIDER_TYPE;
  const { helpers, theme, t, [type]: settings = {}, pluginDefaults = {}, ...rest } = config;

  pluginDefaults[type] = DEFAULTS;

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
    pluginDefaults,
    ...rest,
  });
};

export { createDividerPlugin, DIVIDER_TYPE };
