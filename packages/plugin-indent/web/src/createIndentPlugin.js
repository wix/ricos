import createToolbar from './toolbar';
import { Component, DEFAULTS } from './indent-component';
import { INDENT_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';

const createIndentPlugin = (config = {}) => {
  const { helpers, t, [INDENT_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    component: Component,
    type: INDENT_TYPE,
    toolbar: createToolbar({
      helpers,
      t,
      settings,
      isMobile,
    }),
    helpers,
    settings,
    t,
    isMobile,
    disableRightClick: config?.uiSettings?.disableRightClick,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

export { createIndentPlugin };
