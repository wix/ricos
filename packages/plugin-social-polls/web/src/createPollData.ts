import { merge } from 'lodash';
import { DEFAULT_COMPONENT_DATA } from './defaults';
import { POLL_TYPE } from './types';
import { CreatePluginsDataMap } from 'wix-rich-content-common';
//TODO: implement method
export const createPollData: CreatePluginsDataMap[typeof POLL_TYPE] = pluginData => {
  return merge(DEFAULT_COMPONENT_DATA, pluginData);
};
