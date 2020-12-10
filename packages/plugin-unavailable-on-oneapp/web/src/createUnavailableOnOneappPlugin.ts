import createToolbar from './toolbar/createToolbar';
import { Component, DEFAULTS } from './unavailable-on-oneapp-component';
import { UNAVAILABLE_ON_ONEAPP_TYPE, UnavailableOnOneAppPluginEditorConfig } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createUnavailableOnOneAppPlugin: CreatePluginFunction<UnavailableOnOneAppPluginEditorConfig> = config => {
  const { helpers, t, [UNAVAILABLE_ON_ONEAPP_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    component: Component,
    type: UNAVAILABLE_ON_ONEAPP_TYPE,
    toolbar: createToolbar({
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

export { createUnavailableOnOneAppPlugin };
