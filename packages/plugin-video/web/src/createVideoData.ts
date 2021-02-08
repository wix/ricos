import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_VIDEO_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

export const createVideoData: CreatePluginsDataMap[typeof RICOS_VIDEO_TYPE] = (
  pluginData,
  currentData,
  isRicosSchema = false
) => {
  if (!pluginData) {
    return undefined;
  }
  const videoData = isRicosSchema
    ? convertNodeDataToDraft(Node_Type.VIDEO, pluginData)
    : pluginData;
  return merge({}, currentData || DEFAULTS, videoData);
};
