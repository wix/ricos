import createToolbar from './toolbar';
import { createBasePlugin } from 'wix-rich-content-editor-common';
import { Component, defaults } from './HtmlComponent';
import { HTML_TYPE } from './types';

const createHtmlPlugin = (config = {}) => {
  const type = HTML_TYPE;
  const { helpers, isMobile, t, [type]: settings = {}, getEditorBounds, ...rest } = config;

  const simulateEditClick = ({ e, pubsub }) =>
    pubsub.set('onClickTrigger', { event: e, key: 'edit' });

  return createBasePlugin({
    onOverlayClick: simulateEditClick,
    component: Component,
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
    defaultPluginData: defaults(),
    onComponentMount: simulateEditClick,
    ...rest,
  });
};

export { createHtmlPlugin, HTML_TYPE };
