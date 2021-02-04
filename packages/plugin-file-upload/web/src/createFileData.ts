import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_FILE_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

export const createFileData: CreatePluginsDataMap[typeof RICOS_FILE_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  const fileData = convertNodeDataToDraft(Node_Type.FILE, pluginData);
  return merge({}, currentData || DEFAULTS, fileData);
};
