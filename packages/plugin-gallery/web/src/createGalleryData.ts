import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_GALLERY_TYPE } from 'wix-rich-content-common';
import { RicosGallery } from 'ricos-schema';
import { migrateGalleryData } from 'ricos-content/libs/migrateSchema';

export const createGalleryData: CreatePluginsDataMap[typeof RICOS_GALLERY_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  const galleryData = RicosGallery.toObject(pluginData, {
    enums: String,
  });
  migrateGalleryData(galleryData);
  return merge({}, currentData || DEFAULTS, galleryData);
};
