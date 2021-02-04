import { merge } from 'lodash';
import { DEFAULTS } from './constants';
import { CreatePluginsDataMap, RICOS_GIPHY_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

export const createGiphyData: CreatePluginsDataMap[typeof RICOS_GIPHY_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  const giphyData = convertNodeDataToDraft(Node_Type.GIPHY, pluginData);
  return merge({}, currentData || DEFAULTS, giphyData);
};
