import { createBasePlugin } from 'wix-rich-content-common';
import { MAP_TYPE } from './constants';
import { MapViewer } from './MapViewer';
import createToolbar from './toolbar';

const createMapPlugin = (config = {}) => {
  const type = MAP_TYPE;
  const { helpers, theme, t, [type]: settings = {}, isMobile, ...rest } = config;

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
      isMobile,
    }),
    helpers,
    t,
    isMobile,
    ...rest,
  });
};

export { createMapPlugin, MAP_TYPE };
