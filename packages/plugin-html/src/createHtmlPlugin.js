import createToolbar from './toolbar';
import { createBasePlugin } from 'wix-rich-content-common';
import { Component } from './HtmlComponent';
import { HTML_TYPE } from './types';

const createHtmlPlugin = (config = {}) => {
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

export { createHtmlPlugin, HTML_TYPE };
