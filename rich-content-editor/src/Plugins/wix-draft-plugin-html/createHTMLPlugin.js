import createToolbar from './toolbar';
import createBasePlugin from '../base/basePlugin';
import { Component } from './html-component';
import { HTML_TYPE } from './types';

const createHTMLPlugin = (config = {}) => {
  const { decorator, helpers, theme, isMobile, t, anchorTarget, relValue, html: settings } = config;

  return createBasePlugin({
    component: Component,
    decorator,
    settings,
    theme,
    type: HTML_TYPE,
    toolbar: createToolbar({
      helpers,
      t,
    }),
    helpers,
    isMobile,
    anchorTarget,
    relValue,
    t,
  });
};

export { createHTMLPlugin, HTML_TYPE };
