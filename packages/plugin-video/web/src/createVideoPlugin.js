import createToolbar from './toolbar';
import { Component, DEFAULTS } from './video-component';
import { VIDEO_TYPE, VIDEO_TYPE_LEGACY } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';

const createVideoPlugin = (config = {}) => {
  const { helpers, t, [VIDEO_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    component: Component,
    type: VIDEO_TYPE,
    legacyType: VIDEO_TYPE_LEGACY,
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

export { createVideoPlugin };
