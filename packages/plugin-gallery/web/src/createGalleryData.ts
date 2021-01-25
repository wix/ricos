import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_GALLERY_TYPE } from 'wix-rich-content-common';
// eslint-disable-next-line no-unused-vars
import { RicosGallery } from 'ricos-schema';
import { migrateGalleryData } from 'ricos-content/libs/migrateSchema';

export const createGalleryData: CreatePluginsDataMap[typeof RICOS_GALLERY_TYPE] = pluginData => {
  if (!pluginData) {
    return undefined;
  }
  // const galleryData = RicosGallery.toObject(pluginData, {
  //   enums: String,
  // });
  const galleryData = pluginData;
  migrateGalleryData(galleryData);
  return merge({}, DEFAULTS, galleryData);
};
