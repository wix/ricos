// import { merge } from 'lodash';
// import { DEFAULTS } from './consts';
import { CreatePluginsDataMap, RICOS_IMAGE_TYPE } from 'wix-rich-content-common';
// import { RicosImage } from 'ricos-schema';
// import { migrateImageData } from 'ricos-content/libs/migrateSchema';

export const createImageData: CreatePluginsDataMap[typeof RICOS_IMAGE_TYPE] = pluginData => {
  if (!pluginData) {
    return undefined;
  }
  // const imageData = RicosImage.toObject(pluginData, {
  //   enums: String,
  // });
  // migrateImageData(imageData);
  // return merge({}, DEFAULTS, imageData);
  return undefined;
};

// TODO: Fix bundleSize problem
