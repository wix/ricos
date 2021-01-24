import { merge } from 'lodash';
import { DEFAULTS } from './consts';
import { IMAGE_TYPE } from './types';
import { CreatePluginsDataMap, migrateImageData } from 'wix-rich-content-common';
//TODO: implement method
export const createImageData: CreatePluginsDataMap[typeof IMAGE_TYPE] = pluginData => {
  migrateImageData(pluginData);
  merge(DEFAULTS, pluginData);
  return undefined;
};
