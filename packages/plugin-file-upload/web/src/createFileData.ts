import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_FILE_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

export const createFileData: CreatePluginsDataMap[typeof RICOS_FILE_TYPE] = (
  pluginData,
  currentData,
  isRicosSchema = false
) => {
  if (!pluginData) {
    return undefined;
  }
  const fileData = isRicosSchema ? convertNodeDataToDraft(Node_Type.FILE, pluginData) : pluginData;
  return merge({}, currentData || DEFAULTS, fileData);
};
