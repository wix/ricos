import { CreatePluginsDataMap, RICOS_LINK_TYPE } from 'wix-rich-content-common';

type LinkData = {
  url: string;
  target?: string;
  rel?: string;
  anchorTarget?: string;
  href?: string;
};

const convertLinkData = ({ url, target, href, rel }: LinkData) => {
  let linkData = {};
  if (target === '_blank') {
    linkData = { ...linkData, targetBlank: true };
  } else {
    linkData = { ...linkData, anchorTarget: target || '_self' };
  }
  return { ...linkData, url, href, rel };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createLinkData: CreatePluginsDataMap[typeof RICOS_LINK_TYPE] = pluginData => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return convertLinkData(pluginData);
};
