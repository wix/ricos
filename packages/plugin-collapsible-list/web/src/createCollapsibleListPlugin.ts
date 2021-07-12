import createToolbar from './toolbar/createToolbar';
import { Component, DEFAULTS } from './collapsible-list-component';
import { COLLAPSIBLE_LIST_TYPE, CollapsibleListPluginEditorConfig } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createCollapsibleListPlugin: CreatePluginFunction<CollapsibleListPluginEditorConfig> = config => {
  const {
    localeContent,
    locale,
    helpers,
    t,
    [COLLAPSIBLE_LIST_TYPE]: settings = {},
    isMobile,
    ...rest
  } = config;

  return createBasePlugin({
    component: Component,
    type: COLLAPSIBLE_LIST_TYPE,
    toolbar: createToolbar({
      helpers,
      t,
      settings,
      isMobile,
      locale: localeContent || locale,
    }),
    helpers,
    settings,
    t,
    isMobile,
    defaultPluginData: DEFAULTS,
    noPluginBorder: true,
    noPointerEventsOnFocus: true,
    locale: localeContent || locale,
    ...rest,
  });
};

createCollapsibleListPlugin.functionName = COLLAPSIBLE_LIST_TYPE;

export { createCollapsibleListPlugin };
