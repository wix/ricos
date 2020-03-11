import createToolbar from './toolbar';
import {
  createBasePlugin,
  pluginDecorationProps,
  componentWillReceiveDecorationProps,
} from 'wix-rich-content-editor-common';
import { Component, DEFAULTS } from './HtmlComponent';
import { HTML_TYPE } from './types';

const createHtmlPlugin = (config = {}) => {
  const type = HTML_TYPE;
  const { helpers, isMobile, t, [type]: settings = {}, getEditorBounds, ...rest } = config;

  return createBasePlugin({
    onOverlayClick: ({ e, pubsub, componentData }) =>
      !componentData.src ? pubsub.set('onClickTrigger', { event: e, key: 'edit' }) : null,
    component: Component,
    pluginDecorationProps: props => {
      return pluginDecorationProps(props);
    },
    componentWillReceiveDecorationProps,
    settings,
    type: HTML_TYPE,
    toolbar: createToolbar({
      helpers,
      t,
      isMobile,
      settings,
      getEditorBounds,
    }),
    helpers,
    isMobile,
    t,
    getEditorBounds,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

export { createHtmlPlugin, HTML_TYPE };
