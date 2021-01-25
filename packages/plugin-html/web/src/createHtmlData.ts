import { merge } from 'lodash';
import { defaults } from './defaults';
import { CreatePluginsDataMap, RICOS_HTML_TYPE, migrateHtmlData } from 'wix-rich-content-common';
import { RicosHTML } from 'ricos-schema';

export const createHtmlData: CreatePluginsDataMap[typeof RICOS_HTML_TYPE] = pluginData => {
  if (!pluginData) {
    return undefined;
  }
  const htmlData = RicosHTML.toObject(pluginData, {
    enums: String,
  });
  migrateHtmlData(htmlData);
  return merge({}, defaults(), htmlData);
};
