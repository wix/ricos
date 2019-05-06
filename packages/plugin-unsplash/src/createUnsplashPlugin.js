import createToolbar from './toolbar';
import { Component } from './components/unsplash-component';
import { UNSPLASH_TYPE } from './constants';
import { createBasePlugin } from 'wix-rich-content-common';

const createUnsplashPlugin = (config = {}) => {
  const type = UNSPLASH_TYPE;
  const { helpers, t, [type]: settings = {}, ...rest } = config;

  return createBasePlugin({
    component: Component,
    type: UNSPLASH_TYPE,
    toolbar: createToolbar({
      helpers,
      t,
      settings,
    }),
    helpers,
    settings,
    t,
    ...rest,
  });
};

export { createUnsplashPlugin };
