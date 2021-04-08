import { CreatePluginsDataMap, RICOS_LINK_TYPE, LinkData } from 'wix-rich-content-common';

const convertLinkData = (data: LinkData) => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createLinkData: CreatePluginsDataMap[typeof RICOS_LINK_TYPE] = pluginData => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return convertLinkData(pluginData);
};
