import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { MAP_TYPE, DEFAULTS } from './defaults';
import { MapViewer } from './MapViewer';
import createToolbar from './toolbar/createToolbar';

const createMapPlugin = (config = {}) => {
  const type = MAP_TYPE;
  const { helpers, theme, t, [type]: settings = {}, getEditorBounds, isMobile, ...rest } = config;

  return createBasePlugin({
    component: MapViewer,
    type: MAP_TYPE,
    settings,
    theme,
    toolbar: createToolbar({
      getEditorBounds,
      settings,
      helpers,
      theme,
      t,
      isMobile,
    }),
    helpers,
    getEditorBounds,
    t,
    isMobile,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

export { createMapPlugin, MAP_TYPE };
