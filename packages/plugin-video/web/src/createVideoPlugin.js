import createToolbar from './toolbar';
import { Component, DEFAULTS } from './video-component';
import { VIDEO_TYPE, VIDEO_TYPE_LEGACY } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';

const createVideoPlugin = (config = {}) => {
  const type = VIDEO_TYPE;
  const { helpers, t, [type]: settings = {}, isMobile, pluginDefaults, ...rest } = config;

  pluginDefaults[type] = DEFAULTS;

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
    pluginDefaults,
    ...rest,
  });
};

export { createVideoPlugin };
