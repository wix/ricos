import createToolbar from './toolbar';
import { createBasePlugin } from 'wix-rich-content-common';
import { Component } from './gallery-component';
import { GALLERY_TYPE } from './types';

const createGalleryPlugin = (config = {}) => {
  const type = GALLERY_TYPE;
  const { helpers, theme, t, anchorTarget, relValue, [type]: settings = {}, ...rest } = config;

  return createBasePlugin({
    component: Component,
    settings,
    theme,
    t,
    type,
    toolbar: createToolbar({
      helpers,
      t,
      anchorTarget,
      relValue,
    }),
    helpers,
    anchorTarget,
    relValue,
    ...rest,
  });
};

export { createGalleryPlugin };
