import createToolbar from './toolbar';
import { createBasePlugin } from 'wix-rich-content-editor-common';
import { Component, DEFAULTS } from './gallery-component';
import { GALLERY_TYPE } from './types';

const createGalleryPlugin = (config = {}) => {
  const type = GALLERY_TYPE;
  const {
    helpers,
    theme,
    t,
    anchorTarget,
    relValue,
    [type]: settings = {},
    pluginDefaults = {},
    ...rest
  } = config;

  pluginDefaults[type] = DEFAULTS;

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
    pluginDefaults,
    ...rest,
  });
};

export { createGalleryPlugin };
