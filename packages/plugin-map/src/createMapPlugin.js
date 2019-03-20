import { createBasePlugin } from 'wix-rich-content-common';
import { MAP_TYPE } from './constants';
import { MapViewer } from './MapViewer';
import createToolbar from './toolbar';

const createMapPlugin = (config = {}) => {
  const type = MAP_TYPE;
  const { helpers, theme, t, [type]: settings = {}, ...rest } = config;

  return createBasePlugin({
    component: MapViewer,
    type: MAP_TYPE,
    settings,
    theme,
    toolbar: createToolbar({
      settings,
      helpers,
      theme,
      t,
    }),
    helpers,
    t,
    ...rest,
  });
};

export { createMapPlugin, MAP_TYPE };
