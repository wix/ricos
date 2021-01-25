import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_VIDEO_TYPE } from 'wix-rich-content-common';
// eslint-disable-next-line no-unused-vars
import { RicosVideo } from 'ricos-schema';
import { migrateVideoData } from 'ricos-content/libs/migrateSchema';

export const createVideoData: CreatePluginsDataMap[typeof RICOS_VIDEO_TYPE] = pluginData => {
  if (!pluginData) {
    return undefined;
  }
  // const videoData = RicosVideo.toObject(pluginData, {
  //   enums: String,
  // });
  const videoData = pluginData;
  migrateVideoData(videoData);
  return merge({}, DEFAULTS, videoData);
};
