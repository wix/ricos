import createToolbar from './toolbar';
import {
  createBasePlugin,
  PLUGIN_DECORATION_PROPS,
  PLUGIN_DECORATIONS,
} from 'wix-rich-content-common';
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
    pluginDecorationProps: (props, componentData) => {
      const resizeableProps = PLUGIN_DECORATION_PROPS[PLUGIN_DECORATIONS.RESIZEABLE](props);
      const { size } = componentData.config;
      const isInlineSize = !size || size === 'inline';
      const { width, ...rest } = resizeableProps.style;
      const style = isInlineSize ? { ...rest, width: Math.max(width, 350) } : { ...rest };

      return { ...resizeableProps, style };
    },
    toolbar: createToolbar({
      helpers,
      anchorTarget,
      relValue,
      t,
      uiSettings,
      isMobile,
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
