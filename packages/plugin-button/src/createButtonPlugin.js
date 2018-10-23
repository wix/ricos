import createToolbar from './toolbar';
import { createBasePlugin, mergeStyles } from 'wix-rich-content-common';

import { BUTTON_TYPE, BUTTON_TYPE_LEGACY } from './constants';

import Styles from '../statics/styles/default-styles.scss';
import {Component} from './components/button-component';

const createButtonPlugin = (config = {}) => {
  const type = BUTTON_TYPE;
  const { helpers, theme, t, [type]: settings = {}, ...rest } = config;
  const styles = mergeStyles({ styles: Styles, theme });
  return createBasePlugin({
    component: Component,
    settings,
    theme,
    type,
    type: BUTTON_TYPE,
    legacyType: BUTTON_TYPE_LEGACY,
    toolbar: createToolbar({
      helpers,
      styles,
      theme,
      t
    }),
    helpers,
    t,
    ...rest
  });
};

export { createButtonPlugin, BUTTON_TYPE };
