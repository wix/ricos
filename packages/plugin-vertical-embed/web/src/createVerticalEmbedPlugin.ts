import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { VERTICAL_EMBED_TYPE, VerticalEmbedPluginEditorConfig } from './types';
import VerticalEmbedComponent from './components/vertical-embed-component';
import createToolbar from './toolbar/createToolbar';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createVerticalEmbedPlugin: CreatePluginFunction<VerticalEmbedPluginEditorConfig> = config => {
  const type = VERTICAL_EMBED_TYPE;
  const {
    helpers,
    theme,
    t,
    [type]: settings = {},
    isMobile,
    locale,
    localeContent,
    ...rest
  } = config;

  return createBasePlugin({
    component: VerticalEmbedComponent,
    settings,
    theme,
    type,
    toolbar: createToolbar({
      settings,
      helpers,
      t,
      isMobile,
      locale: localeContent || locale,
    }),
    helpers,
    t,
    defaultPluginData: {},
    isMobile,
    locale: localeContent || locale,
    ...rest,
  });
};

createVerticalEmbedPlugin.functionName = VERTICAL_EMBED_TYPE;

export { createVerticalEmbedPlugin };
