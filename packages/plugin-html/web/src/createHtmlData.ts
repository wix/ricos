import { merge } from 'lodash';
import { defaults } from './defaults';
import { HTML_TYPE } from './types';
import { CreatePluginsDataMap } from 'wix-rich-content-common';
//TODO: implement method
export const createHtmlData: CreatePluginsDataMap[typeof HTML_TYPE] = pluginData => {
  return merge(defaults(), pluginData);
};
