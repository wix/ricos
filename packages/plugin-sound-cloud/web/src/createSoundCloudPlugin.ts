import createToolbar from './toolbar/createToolbar';
import { Component, DEFAULTS } from './soundCloud';
import { SOUND_CLOUD_TYPE, SoundCloudPluginEditorConfig } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createSoundCloudPlugin: CreatePluginFunction<SoundCloudPluginEditorConfig> = config => {
  const type = SOUND_CLOUD_TYPE;
  const { helpers, t, [type]: settings = {}, isMobile, ...rest } = config;
  // eslint-disable-next-line no-console
  console.warn(
    // eslint-disable-next-line max-len
    `Please consume soundCloud plugin through video plugin as described in  https://ricos.js.org/docs/plugins_api/VideoPlugin#sound-cloud-plugin . sound cloud plugin is deprecated and will be removed in v9.0.0`
  );
  return createBasePlugin({
    component: Component,
    settings,
    type,
    toolbar: createToolbar({ helpers, t, isMobile, settings }),
    helpers,
    t,
    isMobile,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

export { createSoundCloudPlugin };
