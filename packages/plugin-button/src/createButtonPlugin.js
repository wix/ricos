import createToolbar from './toolbar';
import { createBasePlugin, mergeStyles, decorateComponentWithProps } from 'wix-rich-content-common';

import { BUTTON_TYPE } from './constants';

import Styles from '../statics/styles/default-styles.scss';
import ButtonComponent from './components/button-component';

const createButtonPlugin = (config = {}) => {
  const type = BUTTON_TYPE;
  const {
    helpers,
    theme,
    t,
    anchorTarget,
    relValue,
    [type]: settings = {},
    ...rest
  } = config;
  const styles = mergeStyles({ styles: Styles, theme });
  const buttonProps = {
    className: theme,
    anchorTarget,
    relValue,
    settings,
  };
  const buttonEntityComponent = decorateComponentWithProps(ButtonComponent, buttonProps);

  return createBasePlugin({
    component: buttonEntityComponent,
    settings,
    theme,
    type: BUTTON_TYPE,
    anchorTarget,
    relValue,
    toolbar: createToolbar({
      helpers,
      styles,
      anchorTarget,
      relValue,
      theme,
      t
    }),
    helpers,
    t,
    ...rest
  });
};

export { createButtonPlugin, BUTTON_TYPE };
