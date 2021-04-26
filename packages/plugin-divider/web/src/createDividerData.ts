import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_DIVIDER_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createDividerData: CreatePluginsDataMap[typeof RICOS_DIVIDER_TYPE] | any = (
  pluginData = {},
  isRicosSchema = false
) => {
  const dividerData = isRicosSchema
    ? convertNodeDataToDraft(Node_Type.DIVIDER, pluginData)
    : pluginData;
  return merge({}, DEFAULTS, dividerData);
};
