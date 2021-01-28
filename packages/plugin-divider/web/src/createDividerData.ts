import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_DIVIDER_TYPE } from 'wix-rich-content-common';
import { rich_content } from 'ricos-schema';
import { convertNodeDataToDraft } from 'ricos-content/libs/migrateSchema';

export const createDividerData: CreatePluginsDataMap[typeof RICOS_DIVIDER_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return DEFAULTS;
  }
  const dividerData = convertNodeDataToDraft(rich_content.Node.Type.DIVIDER, pluginData);
  return merge({}, currentData || DEFAULTS, dividerData);
};
