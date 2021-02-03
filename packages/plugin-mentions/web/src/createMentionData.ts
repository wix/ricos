import { merge } from 'lodash';
import { DEFAULTS } from './defaultSettings';
import { CreatePluginsDataMap, RICOS_MENTION_TYPE, Decoration_Type } from 'wix-rich-content-common';
import { convertDecorationDataToDraft } from 'ricos-content/libs/migrateSchema';

export const createMentionData: CreatePluginsDataMap[typeof RICOS_MENTION_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  const mentionData = convertDecorationDataToDraft(Decoration_Type.MENTION, pluginData);
  return merge({}, currentData || DEFAULTS, mentionData);
};
