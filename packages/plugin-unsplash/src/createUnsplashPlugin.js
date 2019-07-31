import createToolbar from './toolbar';
import { Component } from './components/unsplash-component';
import { UNSPLASH_TYPE } from './constants';
import { createBasePlugin } from 'wix-rich-content-common';

const createUnsplashPlugin = (config = {}) => {
  const type = UNSPLASH_TYPE;
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
    type: UNSPLASH_TYPE,
    toolbar: createToolbar({
      helpers,
      anchorTarget,
      relValue,
      t,
      uiSettings,
      settings,
      isMobile,
    }),
    helpers,
    settings,
    t,
    anchorTarget,
    relValue,
    uiSettings,
    isMobile,
    ...rest,
  });
};

export { createUnsplashPlugin };
