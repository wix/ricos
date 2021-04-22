import { merge } from 'lodash';
import { DEFAULTS } from './video-component';
import { CreatePluginsDataMap, RICOS_VIDEO_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createVideoData: CreatePluginsDataMap[typeof RICOS_VIDEO_TYPE] | any = (
  pluginData = {},
  isRicosSchema = false
) => {
  const videoData = isRicosSchema
    ? convertNodeDataToDraft(Node_Type.VIDEO, pluginData)
    : pluginData;
  return merge({}, DEFAULTS, videoData);
};
