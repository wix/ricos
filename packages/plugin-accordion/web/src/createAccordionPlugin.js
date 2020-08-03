import createToolbar from './toolbar';
import { Component, DEFAULTS } from './accordion-component';
import { ACCORDION_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';

const createAccordionPlugin = (config = {}) => {
  const { helpers, t, [ACCORDION_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    component: Component,
    type: ACCORDION_TYPE,
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

export { createAccordionPlugin };
