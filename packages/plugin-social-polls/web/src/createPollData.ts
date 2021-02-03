import { merge } from 'lodash';
import { DEFAULT_COMPONENT_DATA } from './defaults';
import { CreatePluginsDataMap, RICOS_POLL_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/migrateSchema';

export const createPollData: CreatePluginsDataMap[typeof RICOS_POLL_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return DEFAULT_COMPONENT_DATA;
  }
  const pollData = convertNodeDataToDraft(Node_Type.POLL, pluginData);
  return merge({}, currentData || DEFAULT_COMPONENT_DATA, pollData);
};
