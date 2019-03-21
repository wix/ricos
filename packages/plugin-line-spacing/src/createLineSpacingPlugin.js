import { createBasePlugin } from 'wix-rich-content-common';
import { LINE_SPACING_TYPE } from './types';
import createLineSpacingToolbar from './toolbar/createLineSpacingToolbar';

const createLineSpacingPlugin = (config = {}) => {
  const type = LINE_SPACING_TYPE;
  const { theme, isMobile, t, [type]: settings = {} } = config;

  const toolbar = createLineSpacingToolbar(settings);

  return createBasePlugin({
    theme,
    toolbar,
    isMobile,
    t,
    settings,
  });
};

export { createLineSpacingPlugin };
