import createToolbar from './toolbar';
import { createBasePlugin } from 'wix-rich-content-common';
import { Component } from './HtmlComponent';
import { HTML_TYPE } from './types';

const createHtmlPlugin = (config = {}) => {
  const type = HTML_TYPE;
  const { helpers, isMobile, t, [type]: settings = {}, ...rest } = config;

  return createBasePlugin({
    component: Component,
    settings,
    type: HTML_TYPE,
    toolbar: createToolbar({
      helpers,
      t,
      isMobile,
      settings,
    }),
    helpers,
    isMobile,
    t,
    ...rest,
  });
};

export { createHtmlPlugin, HTML_TYPE };
