import { createBasePlugin } from 'wix-rich-content-plugin-commons';

import { VERTICAL_EMBED_TYPE, DEFAULTS } from './constants';
import VerticalEmbedComponent from './components/vertical-embed-component';
import createToolbar from './toolbar';

const createVerticalEmbedPlugin = (config = {}) => {
  const type = VERTICAL_EMBED_TYPE;
  const { helpers, theme, t, [type]: settings = {}, isMobile, ...rest } = config;

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
    }),
    helpers,
    t,
    defaultPluginData: DEFAULTS,
    isMobile,
    ...rest,
  });
};

export { createVerticalEmbedPlugin };
