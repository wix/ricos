import { merge } from 'lodash';
import { DEFAULTS } from './consts';
import { CreatePluginsDataMap, RICOS_IMAGE_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

export const createImageData: CreatePluginsDataMap[typeof RICOS_IMAGE_TYPE] = (
  pluginData,
  currentData,
  isRicosSchema = false
) => {
  if (!pluginData) {
    return undefined;
  }
  const imageData = isRicosSchema
    ? convertNodeDataToDraft(Node_Type.IMAGE, pluginData)
    : pluginData;
  return merge({}, currentData || DEFAULTS, imageData);
};
