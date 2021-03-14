import { merge } from 'lodash';
import { defaults } from './defaults';
import { CreatePluginsDataMap, RICOS_HTML_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

export const createHtmlData: CreatePluginsDataMap[typeof RICOS_HTML_TYPE] = (
  pluginData,
  currentData,
  isRicosSchema = false
) => {
  if (!pluginData) {
    return undefined;
  }
  const htmlData = isRicosSchema ? convertNodeDataToDraft(Node_Type.HTML, pluginData) : pluginData;
  return merge({}, currentData || defaults(), htmlData);
};
