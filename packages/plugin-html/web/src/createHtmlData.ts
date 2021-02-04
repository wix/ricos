import { merge } from 'lodash';
import { defaults } from './defaults';
import { CreatePluginsDataMap, RICOS_HTML_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

export const createHtmlData: CreatePluginsDataMap[typeof RICOS_HTML_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  const htmlData = convertNodeDataToDraft(Node_Type.HTML, pluginData);
  return merge({}, currentData || defaults(), htmlData);
};
