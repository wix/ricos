import { merge } from 'lodash';
import { DEFAULT_COMPONENT_DATA } from './defaults';
import { CreatePluginsDataMap, RICOS_POLL_TYPE, Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPollData: CreatePluginsDataMap[typeof RICOS_POLL_TYPE] | any = (
  pluginData = {},
  isRicosSchema = false
) => {
  const pollData = isRicosSchema ? convertNodeDataToDraft(Node_Type.POLL, pluginData) : pluginData;
  return merge({}, DEFAULT_COMPONENT_DATA, pollData);
};
