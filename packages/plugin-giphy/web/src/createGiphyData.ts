import { merge } from 'lodash';
import { DEFAULTS } from './constants';
import { GIPHY_TYPE } from './types';
import { CreatePluginsDataMap } from 'wix-rich-content-common';
import { RicosGiphy } from 'ricos-schema';
import { migrateGiphyData } from 'ricos-content';

export const createGiphyData: CreatePluginsDataMap[typeof GIPHY_TYPE] = pluginData => {
  if (!pluginData) {
    return undefined;
  }
  const giphyData = RicosGiphy.toObject(pluginData, {
    enums: String,
  });
  migrateGiphyData(giphyData);
  return merge({}, DEFAULTS, giphyData);
};
