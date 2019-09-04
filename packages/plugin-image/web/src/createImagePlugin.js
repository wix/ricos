import createToolbar from './toolbar';
import { createBasePlugin } from 'wix-rich-content-common';
import { Component } from './image-component';
import { IMAGE_TYPE, IMAGE_TYPE_LEGACY } from './types';

const createImagePlugin = (config = {}) => {
  const type = IMAGE_TYPE;
  const {
    helpers,
    t,
    anchorTarget,
    relValue,
    [type]: settings = {},
    uiSettings,
    isMobile,
    ...rest
  } = config;

  return createBasePlugin({
    component: Component,
    type: IMAGE_TYPE,
    legacyType: IMAGE_TYPE_LEGACY,
    toolbar: createToolbar({
      helpers,
      anchorTarget,
      relValue,
      t,
      uiSettings,
      isMobile,
      settings,
    }),
    helpers,
    anchorTarget,
    relValue,
    settings,
    uiSettings,
    t,
    isMobile,
    ...rest,
  });
};

export { createImagePlugin };
