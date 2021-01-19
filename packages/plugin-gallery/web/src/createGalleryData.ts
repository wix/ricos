import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { GALLERY_TYPE } from './types';
import { CreatePluginsDataMap } from 'wix-rich-content-common';
import { RicosGallery } from 'ricos-schema';
import { migrateGalleryData } from 'ricos-content';

export const createGalleryData: CreatePluginsDataMap[typeof GALLERY_TYPE] = pluginData => {
  if (!pluginData) {
    return undefined;
  }
  const galleryData = RicosGallery.toObject(pluginData, {
    enums: String,
  });
  migrateGalleryData(galleryData);
  return merge({}, DEFAULTS, galleryData);
};
