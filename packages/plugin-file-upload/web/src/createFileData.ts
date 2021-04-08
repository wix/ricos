import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_FILE_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createFileData: CreatePluginsDataMap[typeof RICOS_FILE_TYPE] | any = (
  pluginData = {},
  isRicosSchema = false
) => {
  const fileData = isRicosSchema ? convertNodeDataToDraft(Node_Type.FILE, pluginData) : pluginData;
  return merge({}, DEFAULTS, fileData);
};
