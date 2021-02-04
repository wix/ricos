import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_GALLERY_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

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
  const galleryData = convertNodeDataToDraft(Node_Type.GALLERY, pluginData);
  return merge({}, currentData || DEFAULTS, galleryData);
};
