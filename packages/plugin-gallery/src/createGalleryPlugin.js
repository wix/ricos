import createToolbar from './toolbar';
import { createBasePlugin } from 'wix-rich-content-common';
import { Component } from './gallery-component';
import { GALLERY_TYPE } from './types';

const createGalleryPlugin = (config = {}) => {
  const { decorator, helpers, theme, isMobile, t, anchorTarget, relValue, gallery: settings } = config;

  return createBasePlugin({
    component: Component,
    decorator,
    settings,
    theme,
    t,
    type: GALLERY_TYPE,
    toolbar: createToolbar({
      helpers,
      t
    }),
    helpers,
    isMobile,
    anchorTarget,
    relValue,
  });
};

export { createGalleryPlugin };
