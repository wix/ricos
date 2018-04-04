import createBasePlugin from '../base/basePlugin';
import createToolbar from './toolbar';
import { Component } from './divider-component';
import { DIVIDER_TYPE } from './types';

const createDividerPlugin = (config = {}) => {
  const { decorator, helpers, theme, isMobile, t, anchorTarget, relValue, divider: settings } = config;

  return createBasePlugin({
    component: Component,
    decorator,
    settings,
    theme,
    type: DIVIDER_TYPE,
    toolbar: createToolbar({
      helpers,
      t
    }),
    helpers,
    isMobile,
    anchorTarget,
    relValue,
    t,
  });
};

export { createDividerPlugin, DIVIDER_TYPE };
