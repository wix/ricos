import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_VIDEO_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/migrateSchema';

export const createVideoData: CreatePluginsDataMap[typeof RICOS_VIDEO_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  const videoData = convertNodeDataToDraft(Node_Type.VIDEO, pluginData);
  return merge({}, currentData || DEFAULTS, videoData);
};
