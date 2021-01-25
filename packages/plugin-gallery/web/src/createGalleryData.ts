import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import {
  CreatePluginsDataMap,
  RICOS_GALLERY_TYPE,
  migrateGalleryData,
} from 'wix-rich-content-common';
import { RicosGallery } from 'ricos-schema';

export const createGalleryData: CreatePluginsDataMap[typeof RICOS_GALLERY_TYPE] = pluginData => {
  if (!pluginData) {
    return undefined;
  }
  const galleryData = RicosGallery.toObject(pluginData, {
    enums: String,
  });
  migrateGalleryData(galleryData);
  return merge({}, DEFAULTS, galleryData);
};
