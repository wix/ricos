import { merge } from 'lodash';
import { DEFAULTS } from './constants';
import { GIPHY_TYPE } from './types';
import { CreatePluginsDataMap } from 'wix-rich-content-common';
//TODO: implement method
export const createGiphyData: CreatePluginsDataMap[typeof GIPHY_TYPE] = pluginData => {
  if (!pluginData) {
    return undefined;
  }
  return merge(DEFAULTS, pluginData);
};
