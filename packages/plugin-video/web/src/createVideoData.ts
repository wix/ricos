import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { VIDEO_TYPE } from './types';
import { CreatePluginsDataMap } from 'wix-rich-content-common';
//TODO: implement method
export const createVideoData: CreatePluginsDataMap[typeof VIDEO_TYPE] = pluginData => {
  return merge(DEFAULTS, pluginData);
};
