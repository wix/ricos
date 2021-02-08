import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_DIVIDER_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

export const createDividerData: CreatePluginsDataMap[typeof RICOS_DIVIDER_TYPE] = (
  pluginData,
  currentData,
  isRicosSchema = false
) => {
  if (!pluginData) {
    return DEFAULTS;
  }
  const dividerData = isRicosSchema
    ? convertNodeDataToDraft(Node_Type.DIVIDER, pluginData)
    : pluginData;
  return merge({}, currentData || DEFAULTS, dividerData);
};
