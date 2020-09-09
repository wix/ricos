import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { LINE_SPACING_TYPE } from './types';
import createLineSpacingToolbar from './toolbar/createToolbar';

const createLineSpacingPlugin = (config = {}) => {
  const type = LINE_SPACING_TYPE;
  const { theme, isMobile, t, [type]: settings = {} } = config;

  const toolbar = createLineSpacingToolbar(config);

  return createBasePlugin({
    theme,
    toolbar,
    isMobile,
    t,
    settings,
  });
};

export { createLineSpacingPlugin };
