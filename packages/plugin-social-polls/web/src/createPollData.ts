import { merge } from 'lodash';
import { DEFAULT_COMPONENT_DATA } from './defaults';
import { CreatePluginsDataMap, RICOS_POLL_TYPE } from 'wix-rich-content-common';
import { RicosPoll } from 'ricos-schema';
import { migratePollData } from 'ricos-content/libs/migrateSchema';

export const createPollData: CreatePluginsDataMap[typeof RICOS_POLL_TYPE] = pluginData => {
  if (!pluginData) {
    return DEFAULT_COMPONENT_DATA;
  }
  const pollData = RicosPoll.toObject(pluginData, {
    enums: String,
  });
  migratePollData(pollData);
  return merge({}, DEFAULT_COMPONENT_DATA, pollData);
};
