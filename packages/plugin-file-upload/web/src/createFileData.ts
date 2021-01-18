import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { FILE_UPLOAD_TYPE } from './types';
import { CreatePluginsDataMap } from 'wix-rich-content-common';
//TODO: implement method
export const createFileData: CreatePluginsDataMap[typeof FILE_UPLOAD_TYPE] = pluginData => {
  merge(DEFAULTS, pluginData);
  return undefined;
};
