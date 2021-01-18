import { merge } from 'lodash';
import { DEFAULTS } from './consts';
import { IMAGE_TYPE } from './types';
import { CreatePluginsDataMap } from 'wix-rich-content-common';
//TODO: implement method
export const createGalleryData: CreatePluginsDataMap[typeof IMAGE_TYPE] = pluginData => {
  return merge(DEFAULTS, pluginData);
};
