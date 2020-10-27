import createToolbar from './toolbar/createToolbar';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { Component, defaults } from './HtmlComponent';
import { HTML_TYPE } from './types';
import { CreatePluginFunction, Pubsub } from 'wix-rich-content-common';
import { ComponentType } from 'react';

const createHtmlPlugin: CreatePluginFunction = config => {
  const { helpers, isMobile, t, [HTML_TYPE]: settings = {}, getEditorBounds, ...rest } = config;

  const simulateEditClick = ({ e, pubsub }: { e: Event; pubsub: Pubsub }) =>
    setTimeout(() => pubsub.set('onClickTrigger', { event: e, key: 'edit' })); //setTimeout to wait for toolbar to load

  return createBasePlugin({
    onOverlayClick: simulateEditClick,
    component: Component as ComponentType,
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
