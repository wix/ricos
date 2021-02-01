import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_GALLERY_TYPE } from 'wix-rich-content-common';
import { rich_content } from 'ricos-schema';
import { convertNodeDataToDraft } from 'ricos-content/libs/migrateSchema';

export const createGalleryData: CreatePluginsDataMap[typeof RICOS_GALLERY_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  if (currentData) {
    // eslint-disable-next-line fp/no-delete
    delete currentData.items;
  }
  const galleryData = convertNodeDataToDraft(rich_content.Node.Type.GALLERY, pluginData);
  return merge({}, currentData || DEFAULTS, galleryData);
};
