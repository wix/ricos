import createToolbar from './toolbar/createToolbar';
import {
  createBasePlugin,
  PLUGIN_DECORATION_PROPS,
  PLUGIN_DECORATIONS,
} from 'wix-rich-content-plugin-commons';
import { Component, DEFAULTS } from './image-component';
import { IMAGE_TYPE, IMAGE_TYPE_LEGACY } from './types';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createImagePlugin: CreatePluginFunction = config => {
  const type = IMAGE_TYPE;
  const {
    helpers,
    t,
    anchorTarget,
    relValue,
    [type]: settings = {},
    uiSettings,
    isMobile,
    innerModal,
    ...rest
  } = config;

  return createBasePlugin({
    component: Component,
    type: IMAGE_TYPE,
    legacyType: IMAGE_TYPE_LEGACY,
    pluginDecorationProps: (props, componentData) => {
      const size = componentData.config?.size;
      let calulatedProps = props;
      if (size === 'original' && componentData.src?.width) {
        calulatedProps = {
          ...props,
          width: componentData.src.width,
          style: {
            ...(componentData.src.style || {}),
            width: componentData.src.width,
          },
        };
      }
      const resizeableProps = PLUGIN_DECORATION_PROPS[PLUGIN_DECORATIONS.RESIZEABLE](
        calulatedProps
      );

      if (size === 'inline') {
        return resizeableProps;
      } else if (size === 'original') {
        return { ...resizeableProps, style: { ...resizeableProps.style, maxWidth: '100%' } };
      } else {
        const { width, ...allButWidth } = resizeableProps.style; // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars
        return { ...resizeableProps, style: { ...allButWidth } };
      }
    },
    componentWillReceiveDecorationProps: (props, nextProps, onPropsChange) => {
      const { width } = PLUGIN_DECORATION_PROPS[PLUGIN_DECORATIONS.RESIZEABLE](props);
      const { width: nextWidth } = PLUGIN_DECORATION_PROPS[PLUGIN_DECORATIONS.RESIZEABLE](
        nextProps
      );
      if (width !== nextWidth) {
        onPropsChange({ size: 'inline', width: nextWidth });
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
    innerModal,
    anchorTarget,
    relValue,
    settings,
    uiSettings,
    t,
    isMobile,
    disableRightClick: config?.uiSettings?.disableRightClick,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

export { createImagePlugin };
