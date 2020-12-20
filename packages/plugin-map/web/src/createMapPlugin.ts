import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { DEFAULTS } from './defaults';
import { MAP_TYPE, MapPluginEditorConfig } from './types';
import { MapViewer } from './MapViewer';
import createToolbar from './toolbar/createToolbar';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createMapPlugin: CreatePluginFunction<MapPluginEditorConfig> = config => {
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
