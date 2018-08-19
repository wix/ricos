import createToolbar from './toolbar';
import { Component } from './soundcloud';
import { SOUNDCLOUD_TYPE, SOUNDCLOUD_TYPE_LEGACY } from './types';
import { createBasePlugin } from 'wix-rich-content-common';

const createSoundCloudPlugin = (config = {}) => {
  const { decorator, helpers, theme, t, isMobile, anchorTarget, relValue, soundCloud: settings } = config;

  return createBasePlugin({
    component: Component,
    decorator,
    settings,
    theme,
    type: SOUNDCLOUD_TYPE,
    legacyType: SOUNDCLOUD_TYPE_LEGACY,
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
