import createToolbar from './toolbar';
import { createBasePlugin } from 'wix-rich-content-editor-common';
import { Component, defaults } from './HtmlComponent';
import { HTML_TYPE } from './types';

const createHtmlPlugin = (config = {}) => {
  const { helpers, isMobile, t, [HTML_TYPE]: settings = {}, getEditorBounds, ...rest } = config;

  const simulateEditClick = ({ e, pubsub }) =>
    setTimeout(() => pubsub.set('onClickTrigger', { event: e, key: 'edit' })); //setTimeout to wait for toolbar to load

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
