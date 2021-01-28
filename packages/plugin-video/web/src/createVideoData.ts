import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_VIDEO_TYPE } from 'wix-rich-content-common';
import { rich_content } from 'ricos-schema';
import { convertNodeDataToDraft } from 'ricos-content/libs/migrateSchema';

export const createVideoData: CreatePluginsDataMap[typeof RICOS_VIDEO_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  const videoData = convertNodeDataToDraft(rich_content.Node.Type.VIDEO, pluginData);
  return merge({}, currentData || DEFAULTS, videoData);
};
