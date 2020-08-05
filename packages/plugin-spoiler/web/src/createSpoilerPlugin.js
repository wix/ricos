import createToolbar from './toolbar/createToolbar';
import { SPOILER_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';
import { styleFnFilter } from './spoilerUtilsFn';
import spoilerEditorWrapper from './spoilerEditorWrapper';

const createSpoilerPlugin = (config = {}) => {
  const { helpers, t, [SPOILER_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
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
    customStyleFn: styleFnFilter(),
    ...rest,
  });
};

createSpoilerPlugin.spoilerEditorWrapper = spoilerEditorWrapper;

export { createSpoilerPlugin };
