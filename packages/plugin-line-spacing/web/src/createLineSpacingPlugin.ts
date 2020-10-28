import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { LINE_SPACING_TYPE } from './types';
import createLineSpacingToolbar from './toolbar/createToolbar';
import { CreatePluginFunction } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

const createLineSpacingPlugin: CreatePluginFunction = config => {
  const type = LINE_SPACING_TYPE;
  const { theme, isMobile, t, [type]: settings = {}, ...rest } = config;

  const toolbar = createLineSpacingToolbar(config);

  return createBasePlugin({
    theme,
    toolbar,
    isMobile,
    t,
    settings,
    type,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

export { createLineSpacingPlugin };
