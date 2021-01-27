import { merge } from 'lodash';
import { DEFAULTS } from './constants';
import { CreatePluginsDataMap, RICOS_GIPHY_TYPE } from 'wix-rich-content-common';
import { RicosGiphy } from 'ricos-schema';
import { migrateGiphyData } from 'ricos-content/libs/migrateSchema';

export const createGiphyData: CreatePluginsDataMap[typeof RICOS_GIPHY_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  const giphyData = RicosGiphy.toObject(pluginData, {
    enums: String,
  });
  migrateGiphyData(giphyData);
  return merge({}, currentData || DEFAULTS, giphyData);
};
