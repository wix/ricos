import { CreatePluginsDataMap, RICOS_LINK_TYPE } from 'wix-rich-content-common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createLinkData: CreatePluginsDataMap[typeof RICOS_LINK_TYPE] = pluginData => {
  return pluginData || {};
};
