import createToolbar from './toolbar/createToolbar';
import { Component, DEFAULTS } from './giphy-component';
import { GIPHY_TYPE, GiphyPluginEditorConfig } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createGiphyPlugin: CreatePluginFunction<GiphyPluginEditorConfig> = config => {
  const type = GIPHY_TYPE;
  const { helpers, t, [type]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    component: Component,
    type: GIPHY_TYPE,
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
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

export { createGiphyPlugin };
