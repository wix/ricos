import createToolbar from './toolbar/createToolbar';
import { SPOILER_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';
import { styleFnFilter } from './spoilerUtilsFn';

const createSpoilerPlugin = (config = {}) => {
  const { helpers, t, [SPOILER_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    type: SPOILER_TYPE,
    toolbar: createToolbar(config),
    helpers,
    settings,
    t,
    isMobile,
    disableRightClick: config?.uiSettings?.disableRightClick,
    customStyleFn: styleFnFilter(),
    ...rest,
  });
};

export { createSpoilerPlugin };
