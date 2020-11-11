import { VIDEO_TYPE, VideoPluginViewerConfig } from './types';
import { DEFAULTS } from './defaults';
import { typeMapper } from './typeMapper';
import { ViewerPlugin } from 'wix-rich-content-common';
export { VIDEO_TYPE, typeMapper as videoTypeMapper };

export const pluginVideo: ViewerPlugin<VideoPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.configViewer, ...config },
    type: VIDEO_TYPE,
    typeMapper,
  };
};
