import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { GALLERY_TYPE } from './types';
import { CreatePluginsDataMap } from 'wix-rich-content-common';
//TODO: implement method
export const createGalleryData: CreatePluginsDataMap[typeof GALLERY_TYPE] = pluginData => {
  merge(DEFAULTS, pluginData);
  return undefined;
};
