import { VIDEO_TYPE } from './types';
import { DEFAULTS } from './defaults';
import { typeMapper } from './typeMapper';
export { VIDEO_TYPE, typeMapper as videoTypeMapper };

export const pluginVideo = (config = {}) => {
  return {
    config: { ...DEFAULTS.configViewer, ...config },
    type: VIDEO_TYPE,
    typeMapper,
  };
};
