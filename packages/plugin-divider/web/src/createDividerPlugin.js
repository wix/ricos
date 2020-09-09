import { mergeStyles } from 'wix-rich-content-common';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';

import { DIVIDER_TYPE, DEFAULTS } from './defaults';
import DividerComponent from './components/divider-component';
import createToolbar from './toolbar';
import Styles from '../statics/styles/default-styles.scss';

const createDividerPlugin = (config = {}) => {
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

export { createDividerPlugin, DIVIDER_TYPE };
