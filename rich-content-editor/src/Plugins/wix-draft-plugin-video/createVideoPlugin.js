import createToolbar from './toolbar';
import createBasePlugin from '../base/basePlugin';
import { Component } from './video-component';
import { VIDEO_TYPE, VIDEO_TYPE_LEGACY } from './types';

const createVideoPlugin = (config = {}) => {
  const { decorator, helpers, theme, t, isMobile, anchorTarget, relValue, video: settings } = config;

  return createBasePlugin({
    component: Component,
    decorator,
    settings,
    theme,
    type: VIDEO_TYPE,
    legacyType: VIDEO_TYPE_LEGACY,
    toolbar: createToolbar({
      helpers,
      t,
    }),
    helpers,
    isMobile,
    anchorTarget,
    relValue,
    t,
  });
};

export { createVideoPlugin, VIDEO_TYPE };
