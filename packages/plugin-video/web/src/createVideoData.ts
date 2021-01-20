import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { VIDEO_TYPE } from './types';
import { CreatePluginsDataMap } from 'wix-rich-content-common';
import { RicosVideo } from 'ricos-schema';
import { migrateVideoData } from 'ricos-content';

export const createVideoData: CreatePluginsDataMap[typeof VIDEO_TYPE] = pluginData => {
  if (!pluginData) {
    return undefined;
  }
  const videoData = RicosVideo.toObject(pluginData, {
    enums: String,
  });
  migrateVideoData(videoData);
  return merge({}, DEFAULTS, videoData);
};
