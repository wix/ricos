import { merge } from 'lodash';
import { DEFAULTS } from './defaultSettings';
import { CreatePluginsDataMap, RICOS_MENTION_TYPE } from 'wix-rich-content-common';
import { rich_content } from 'ricos-schema';
import { convertDecorationDataToDraft } from 'ricos-content/libs/migrateSchema';

export const createMentionData: CreatePluginsDataMap[typeof RICOS_MENTION_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  const mentionData = convertDecorationDataToDraft(
    rich_content.Decoration.Type.MENTION,
    pluginData
  );
  return merge({}, currentData || DEFAULTS, mentionData);
};
