import createToolbar from './toolbar/createToolbar';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { Component, DEFAULTS } from './gallery-component';
import { GALLERY_TYPE, GalleryPluginEditorConfig } from './types';
import { CreatePluginFunction } from 'wix-rich-content-common';

const fileInputAccept = 'image/*,video/*';

const createGalleryPlugin: CreatePluginFunction<GalleryPluginEditorConfig> = config => {
  const type = GALLERY_TYPE;
  const { helpers, theme, t, anchorTarget, relValue, [type]: settings = {}, ...rest } = config;
  settings.accept = settings.accept || fileInputAccept;
  const defaultPluginData = {
    ...DEFAULTS,
    config: { ...DEFAULTS.config, ...settings?.defaultData?.config },
  };
  return createBasePlugin({
    component: Component,
    settings,
    theme,
    t,
    type,
    toolbar: createToolbar({
      settings,
      helpers,
      t,
      anchorTarget,
      relValue,
    }),
    helpers,
    anchorTarget,
    relValue,
    disableRightClick: config?.uiSettings?.disableRightClick,
    defaultPluginData,
    ...rest,
  });
};

export { createGalleryPlugin };
