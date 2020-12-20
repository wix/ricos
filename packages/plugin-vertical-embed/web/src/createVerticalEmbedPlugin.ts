import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { DEFAULTS } from './constants';
import { VERTICAL_EMBED_TYPE, VerticalEmbedPluginEditorConfig } from './types';
import VerticalEmbedComponent from './components/vertical-embed-component';
import createToolbar from './toolbar/createToolbar';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createVerticalEmbedPlugin: CreatePluginFunction<VerticalEmbedPluginEditorConfig> = config => {
  const type = VERTICAL_EMBED_TYPE;
  const { helpers, theme, t, [type]: settings = {}, isMobile, locale, ...rest } = config;

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
      locale,
    }),
    helpers,
    t,
    defaultPluginData: DEFAULTS,
    isMobile,
    locale,
    ...rest,
  });
};

export { createVerticalEmbedPlugin };
