import { merge } from 'lodash';
import { DEFAULTS } from './consts';
import { CreatePluginsDataMap, RICOS_IMAGE_TYPE, migrateImageData } from 'wix-rich-content-common';
//TODO: implement method
export const createImageData: CreatePluginsDataMap[typeof RICOS_IMAGE_TYPE] = pluginData => {
  migrateImageData(pluginData);
  merge(DEFAULTS, pluginData);
  return undefined;
};
