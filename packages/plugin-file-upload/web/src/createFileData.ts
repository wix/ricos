import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { FILE_UPLOAD_TYPE } from './types';
import { CreatePluginsDataMap, migrateFileData } from 'wix-rich-content-common';
import { RicosFile } from 'ricos-schema';

export const createFileData: CreatePluginsDataMap[typeof FILE_UPLOAD_TYPE] = pluginData => {
  if (!pluginData) {
    return undefined;
  }
  const fileData = RicosFile.toObject(pluginData, { enums: String });
  migrateFileData(fileData);
  return merge({}, DEFAULTS, fileData);
};
