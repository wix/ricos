import createToolbar from './toolbar/createToolbar';
import { Component, DEFAULTS } from './giphy-component';
import { GIPHY_TYPE } from './constants';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';

const createGiphyPlugin = (config = {}) => {
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
