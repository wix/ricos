import { typeMapper } from './typeMapper';
import { DEFAULTS, GIPHY_TYPE } from './constants';
export { typeMapper as giphyTypeMapper, GIPHY_TYPE };

export const pluginGiphy = (config = {}) => {
  return {
    config: { ...DEFAULTS.configViewer, ...config },
    type: GIPHY_TYPE,
    typeMapper,
  };
};
