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
      const isInlineSize = size === 'inline';
      const { width, ...rest } = resizeableProps.style; // eslint-disable-line no-unused-vars
      const style = isInlineSize ? resizeableProps.style : { ...rest };
      return { ...resizeableProps, style };
    },
    componentWillReceiveDecorationProps: (props, nextProps, onPropsChange) => {
      const { width } = PLUGIN_DECORATION_PROPS[PLUGIN_DECORATIONS.RESIZEABLE](props);
      const { width: nextWidth } = PLUGIN_DECORATION_PROPS[PLUGIN_DECORATIONS.RESIZEABLE](
        nextProps
      );
      if (width !== nextWidth) {
        onPropsChange({ size: 'inline' });
      }
    },
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
