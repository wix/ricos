import createToolbar from './toolbar';
import SpoilerComponent from './spoiler-component';
import { SPOILER_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';

const createSpoilerPlugin = (config = {}) => {
  const { helpers, t, [SPOILER_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    component: SpoilerComponent,
    type: SPOILER_TYPE,
    toolbar: createToolbar({
      helpers,
      t,
      settings,
      isMobile,
    }),
    helpers,
    settings,
    t,
    isMobile,
    disableRightClick: config?.uiSettings?.disableRightClick,
    ...rest,
  });
};

export { createSpoilerPlugin };
