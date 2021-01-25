import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_FILE_TYPE } from 'wix-rich-content-common';
import { RicosFile } from 'ricos-schema';
import { migrateFileData } from 'ricos-content/libs/migrateSchema';

export const createFileData: CreatePluginsDataMap[typeof RICOS_FILE_TYPE] = pluginData => {
  if (!pluginData) {
    return undefined;
  }
  const fileData = RicosFile.toObject(pluginData, { enums: String });
  migrateFileData(fileData);
  return merge({}, DEFAULTS, fileData);
};
