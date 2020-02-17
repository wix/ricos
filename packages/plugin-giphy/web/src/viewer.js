import { typeMapper } from './typeMapper';
export { typeMapper as giphyTypeMapper };
import { DEFAULTS, GIPHY_TYPE } from './constants';
export { typeMapper as galleryTypeMapper, GIPHY_TYPE };

export const pluginGiphy = (config = {}) => {
  return {
    config: { ...DEFAULTS.configViewer, ...config },
    type: GIPHY_TYPE,
    typeMapper,
    decorator: {},
  };
};
