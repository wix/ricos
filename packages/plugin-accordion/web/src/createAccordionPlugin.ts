import createToolbar from './toolbar/createToolbar';
import { Component, DEFAULTS } from './accordion-component';
import { ACCORDION_TYPE, AccordionPluginEditorConfig } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createAccordionPlugin: CreatePluginFunction<AccordionPluginEditorConfig> = config => {
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
    noPluginBorder: true,
    noPointerEventsOnFocus: true,
    ...rest,
  });
};

export { createAccordionPlugin };
