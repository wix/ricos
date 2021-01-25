import { merge } from 'lodash';
import { DEFAULT_COMPONENT_DATA } from './defaults';
import { CreatePluginsDataMap, RICOS_POLL_TYPE, migratePollData } from 'wix-rich-content-common';
import { RicosPoll } from 'ricos-schema';

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
