import { IMAGE_TYPE, GALLERY_TYPE } from 'ricos-content';

export const deprecateHelpers = (helpers = {}, config) => {
  const { onExpand, ...rest } = helpers;
  if (onExpand) {
    if (config[GALLERY_TYPE]) {
      config[GALLERY_TYPE].onExpand = onExpand;
    }
    if (config[IMAGE_TYPE]) {
      config[IMAGE_TYPE].onExpand = onExpand;
    }
    helpers.onExpand = undefined;
  }
  return rest;
};
