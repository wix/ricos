import { createBasePlugin } from 'wix-rich-content-editor-common';
import { MAP_TYPE, DEFAULTS } from './constants';
import { MapViewer } from './MapViewer';
import createToolbar from './toolbar';

const createMapPlugin = (config = {}) => {
  const type = MAP_TYPE;
  const {
    helpers,
    theme,
    t,
    [type]: settings = {},
    getEditorBounds,
    isMobile,
    pluginDefaults,
    ...rest
  } = config;

  pluginDefaults[type] = DEFAULTS;

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
    pluginDefaults,
    ...rest,
  });
};

export { createMapPlugin, MAP_TYPE };
