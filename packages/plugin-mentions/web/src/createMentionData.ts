import { merge } from 'lodash';
import { CreatePluginsDataMap, RICOS_MENTION_TYPE } from 'wix-rich-content-common';

export const createMentionData: CreatePluginsDataMap[typeof RICOS_MENTION_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  return merge({}, currentData || {}, pluginData);
};
