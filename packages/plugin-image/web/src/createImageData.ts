import { merge } from 'lodash';
import { DEFAULTS } from './consts';
import { CreatePluginsDataMap, RICOS_IMAGE_TYPE } from 'wix-rich-content-common';
import { rich_content } from 'ricos-schema';
import { convertNodeDataToDraft } from 'ricos-content/libs/migrateSchema';

export const createImageData: CreatePluginsDataMap[typeof RICOS_IMAGE_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  const imageData = convertNodeDataToDraft(rich_content.Node.Type.IMAGE, pluginData);
  return merge({}, currentData || DEFAULTS, imageData);
};
