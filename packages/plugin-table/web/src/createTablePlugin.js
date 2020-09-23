import createToolbar from './toolbar/createToolbar';
import { Component, DEFAULTS } from './table-component';
import { TABLE_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';

const createTablePlugin = (config = {}) => {
  const { helpers, t, [TABLE_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    component: Component,
    type: TABLE_TYPE,
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

export { createTablePlugin };
