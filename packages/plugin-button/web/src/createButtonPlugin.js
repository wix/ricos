import createToolbar from './toolbar';
import { mergeStyles } from 'wix-rich-content-common';
import { createBasePlugin } from 'wix-rich-content-editor-common';

import { BUTTON_TYPE, getDefaultComponentData } from './constants';

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
    isMobile,
    [type]: settings = {},
    ...rest
  } = config;

  const styles = mergeStyles({ styles: Styles, theme });
  const rel = relValue === '_nofollow';
  const target = anchorTarget ? anchorTarget === '_blank' : true;

  return createBasePlugin({
    component: ButtonComponent,
    settings,
    theme,
    type: BUTTON_TYPE,
    anchorTarget,
    relValue,
    toolbar: createToolbar({
      helpers,
      styles,
      settings,
      anchorTarget,
      relValue,
      isMobile,
      theme,
      t,
    }),
    helpers,
    t,
    defaultPluginData: getDefaultComponentData(rel, target),
    ...rest,
  });
};

export { createButtonPlugin, BUTTON_TYPE };
