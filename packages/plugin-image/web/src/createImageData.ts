import { merge } from 'lodash';
import { DEFAULTS } from './consts';
import { CreatePluginsDataMap, RICOS_IMAGE_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createImageData: CreatePluginsDataMap[typeof RICOS_IMAGE_TYPE] | any = (
  pluginData = {},
  isRicosSchema = false
) => {
  const imageData = isRicosSchema
    ? convertNodeDataToDraft(Node_Type.IMAGE, pluginData)
    : pluginData;
  return merge({}, DEFAULTS, imageData);
};
