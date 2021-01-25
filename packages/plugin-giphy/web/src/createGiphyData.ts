import { merge } from 'lodash';
import { DEFAULTS } from './constants';
import { CreatePluginsDataMap, RICOS_GIPHY_TYPE, migrateGiphyData } from 'wix-rich-content-common';
import { RicosGiphy } from 'ricos-schema';

export const createGiphyData: CreatePluginsDataMap[typeof RICOS_GIPHY_TYPE] = pluginData => {
  if (!pluginData) {
    return undefined;
  }
  const giphyData = RicosGiphy.toObject(pluginData, {
    enums: String,
  });
  migrateGiphyData(giphyData);
  return merge({}, DEFAULTS, giphyData);
};
