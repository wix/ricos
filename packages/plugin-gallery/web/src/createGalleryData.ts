import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_GALLERY_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createGalleryData: CreatePluginsDataMap[typeof RICOS_GALLERY_TYPE] | any = (
  pluginData = {},
  isRicosSchema = false
) => {
  const galleryData = isRicosSchema
    ? convertNodeDataToDraft(Node_Type.GALLERY, pluginData)
    : pluginData;
  return merge({}, DEFAULTS, galleryData);
};
