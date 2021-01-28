import { merge } from 'lodash';
import { DEFAULTS } from './constants';
import { CreatePluginsDataMap, RICOS_GIPHY_TYPE } from 'wix-rich-content-common';
import { rich_content } from 'ricos-schema';
import { convertNodeDataToDraft } from 'ricos-content/libs/migrateSchema';

export const createGiphyData: CreatePluginsDataMap[typeof RICOS_GIPHY_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  const giphyData = convertNodeDataToDraft(rich_content.Node.Type.GIPHY, pluginData);
  return merge({}, currentData || DEFAULTS, giphyData);
};
