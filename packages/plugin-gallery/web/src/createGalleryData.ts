import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_GALLERY_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

export const createGalleryData: CreatePluginsDataMap[typeof RICOS_GALLERY_TYPE] = (
  pluginData,
  currentData,
  isRicosSchema = false
) => {
  if (!pluginData) {
    return undefined;
  }
  if (currentData) {
    // eslint-disable-next-line fp/no-delete
    delete currentData.items;
  }
  const galleryData = isRicosSchema
    ? convertNodeDataToDraft(Node_Type.GALLERY, pluginData)
    : pluginData;
  return merge({}, currentData || DEFAULTS, galleryData);
};
