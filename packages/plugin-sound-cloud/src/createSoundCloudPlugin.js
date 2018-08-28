import createToolbar from './toolbar';
import { Component } from './soundCloud';
import { SOUND_CLOUD_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-common';

const createSoundCloudPlugin = (config = {}) => {
  const { decorator, helpers, theme, t, isMobile, anchorTarget, relValue, soundCloud: settings } = config;

  return createBasePlugin({
    component: Component,
    decorator,
    settings,
    theme,
    type: SOUND_CLOUD_TYPE,
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

export { createSoundCloudPlugin };
