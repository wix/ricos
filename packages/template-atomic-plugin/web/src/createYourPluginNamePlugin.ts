import createToolbar from './toolbar/createToolbar';
import { Component, DEFAULTS } from './yourDpluginDname-component';
import { YOUR_PLUGIN_NAME_TYPE, YourPluginNamePluginEditorConfig } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createYourPluginNamePlugin: CreatePluginFunction<YourPluginNamePluginEditorConfig> = config => {
  const { helpers, t, [YOUR_PLUGIN_NAME_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    component: Component,
    type: YOUR_PLUGIN_NAME_TYPE,
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

export { createYourPluginNamePlugin };
