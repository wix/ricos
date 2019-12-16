import createToolbar from './toolbar';
import { createBasePlugin } from 'wix-rich-content-editor-common';
import { Component, DEFAULTS } from './gallery-component';
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
    defaultContentState: DEFAULTS,
    ...rest,
  });
};

export { createGalleryPlugin };
