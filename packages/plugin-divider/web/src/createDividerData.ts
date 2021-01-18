import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { DIVIDER_TYPE } from './types';
import { CreatePluginsDataMap } from 'wix-rich-content-common';

export const createDividerData: CreatePluginsDataMap[typeof DIVIDER_TYPE] = pluginData => {
  if (!pluginData) {
    return DEFAULTS;
  }
  const { type, ...rest } = pluginData;
  const data = { type, config: rest };
  return merge(DEFAULTS, data);
};
