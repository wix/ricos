import createToolbar from './toolbar/createToolbar';
import { HEADINGS_DROPDOWN_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';

const createHeadingsPlugin = (config = {}) => {
  const { helpers, t, [HEADINGS_DROPDOWN_TYPE]: settings = {}, isMobile } = config;
  return createBasePlugin({
    toolbar: createToolbar(config),
    helpers,
    settings,
    t,
    isMobile,
  });
};

export { createHeadingsPlugin };
