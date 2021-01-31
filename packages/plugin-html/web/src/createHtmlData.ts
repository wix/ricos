import { merge } from 'lodash';
import { defaults } from './defaults';
import { CreatePluginsDataMap, RICOS_HTML_TYPE } from 'wix-rich-content-common';
import { rich_content } from 'ricos-schema';
import { convertNodeDataToDraft } from 'ricos-content/libs/migrateSchema';

export const createHtmlData: CreatePluginsDataMap[typeof RICOS_HTML_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  const htmlData = convertNodeDataToDraft(rich_content.Node.Type.HTML, pluginData);
  return merge({}, currentData || defaults(), htmlData);
};
