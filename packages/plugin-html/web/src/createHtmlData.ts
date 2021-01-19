import { merge } from 'lodash';
import { defaults } from './defaults';
import { HTML_TYPE } from './types';
import { CreatePluginsDataMap } from 'wix-rich-content-common';
import { RicosHTML } from 'ricos-schema';
import { migrateHtmlData } from 'ricos-content';

export const createHtmlData: CreatePluginsDataMap[typeof HTML_TYPE] = pluginData => {
  if (!pluginData) {
    return undefined;
  }
  const htmlData = RicosHTML.toObject(pluginData, {
    enums: String,
  });
  migrateHtmlData(htmlData);
  return merge({}, defaults(), htmlData);
};
