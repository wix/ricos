import createToolbar from './toolbar/createToolbar';
import { HEADINGS_DROPDOWN_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';

const createHeadingsPlugin = (config = {}) => {
  const { helpers, t, [HEADINGS_DROPDOWN_TYPE]: settings = {}, isMobile } = config;
  const icons = settings?.toolbar?.icons || {};
  const customHeadings = settings?.dropDownOptions;
  return createBasePlugin({
    toolbar: createToolbar({
      helpers,
      t,
      settings,
      isMobile,
      customHeadings,
      icons,
    }),
    helpers,
    settings,
    t,
    isMobile,
  });
};

export { createHeadingsPlugin };
