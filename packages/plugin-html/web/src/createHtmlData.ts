import { merge } from 'lodash';
import { defaults } from './defaults';
import { CreatePluginsDataMap, RICOS_HTML_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createHtmlData: CreatePluginsDataMap[typeof RICOS_HTML_TYPE] | any = (
  pluginData = {},
  isRicosSchema = false
) => {
  const htmlData = isRicosSchema ? convertNodeDataToDraft(Node_Type.HTML, pluginData) : pluginData;
  return merge({}, defaults(), htmlData);
};
