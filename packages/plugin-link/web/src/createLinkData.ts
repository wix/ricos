import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import { CreatePluginsDataMap, RICOS_LINK_TYPE } from 'wix-rich-content-common';
import { rich_content } from 'ricos-schema';

const convertLinkData = (data: rich_content.LinkData) => {
  let linkData = {};
  if (data.target === '_blank') {
    linkData = { ...linkData, targetBlank: true };
  } else {
    linkData = { ...linkData, anchorTarget: data.target || '_self' };
  }
  if (data.rel === 'nofollow') {
    linkData = { ...linkData, nofollow: true };
  } else {
    linkData = { ...linkData, relValue: data.rel || 'noopener' };
  }
  return { ...linkData, url: data.url, href: data.href };
};

export const createLinkData: CreatePluginsDataMap[typeof RICOS_LINK_TYPE] = (
  pluginData,
  currentData
) => {
  if (!pluginData) {
    return undefined;
  }
  const linkData = convertLinkData(pluginData);
  return merge({}, currentData || DEFAULTS, linkData);
};
