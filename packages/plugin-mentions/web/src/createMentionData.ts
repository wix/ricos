import { CreatePluginsDataMap, RICOS_MENTION_TYPE } from 'wix-rich-content-common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createMentionData: CreatePluginsDataMap[typeof RICOS_MENTION_TYPE] | any = (
  pluginData = {}
) => {
  return pluginData;
};
