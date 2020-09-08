import createToolbar from './toolbar';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { Component, DEFAULTS } from './gallery-component';
import { GALLERY_TYPE } from './types';

const fileInputAccept = 'image/*,video/*';

const createGalleryPlugin = (config = {}) => {
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
