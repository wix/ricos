import { IMAGE_TYPE, GALLERY_TYPE } from 'ricos-content';
import { Helpers } from '../src';

export const deprecateHelpers = (helpers: Helpers = {}, config) => {
  const { onExpand } = helpers;
  if (onExpand) {
    if (config[GALLERY_TYPE]) {
      config[GALLERY_TYPE].onExpand = onExpand;
    }
    if (config[IMAGE_TYPE]) {
      config[IMAGE_TYPE].onExpand = onExpand;
    }
    // eslint-disable-next-line fp/no-delete
    delete helpers.onExpand;
  }
};
