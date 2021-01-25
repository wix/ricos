import { merge } from 'lodash';
import { DEFAULTS } from './constants';
import { CreatePluginsDataMap, RICOS_GIPHY_TYPE } from 'wix-rich-content-common';
// eslint-disable-next-line no-unused-vars
import { RicosGiphy } from 'ricos-schema';
import { migrateGiphyData } from 'ricos-content/libs/migrateSchema';

export const createGiphyData: CreatePluginsDataMap[typeof RICOS_GIPHY_TYPE] = pluginData => {
  if (!pluginData) {
    return undefined;
  }
  // const giphyData = RicosGiphy.toObject(pluginData, {
  //   enums: String,
  // });
  const giphyData = pluginData;
  migrateGiphyData(giphyData);
  return merge({}, DEFAULTS, giphyData);
};
