import createToolbar from './toolbar';
import { Component, DEFAULTS } from './soundCloud';
import { SOUND_CLOUD_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';

const createSoundCloudPlugin = (config = {}) => {
  const type = SOUND_CLOUD_TYPE;
  const { helpers, t, [type]: settings = {}, isMobile, pluginDefaults, ...rest } = config;

  pluginDefaults[type] = DEFAULTS;

  return createBasePlugin({
    component: Component,
    settings,
    type,
    toolbar: createToolbar({ helpers, t, isMobile, settings }),
    helpers,
    t,
    isMobile,
    pluginDefaults,
    ...rest,
  });
};

export { createSoundCloudPlugin };
