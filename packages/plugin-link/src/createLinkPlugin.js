import { createBasePlugin } from 'wix-rich-content-common';
import { LINK_TYPE } from './types';
import { Component } from './LinkComponent';
import { linkEntityStrategy, autoLinkifyStrategy } from './strategies';
import createLinkToolbar from './toolbar/createLinkToolbar';

const createLinkPlugin = (config = {}) => {
  const type = LINK_TYPE;
  const { theme, anchorTarget, relValue, [type]: settings = {}, ...rest } = config;
  const toolbar = createLinkToolbar(config);

  const decorators = [];
  if (settings.autoLink !== false) {
    decorators.push({
      strategy: autoLinkifyStrategy({ ...config }),
      component: {},
    });
  }

  decorators.push({ strategy: linkEntityStrategy, component: Component });

  return createBasePlugin(
    {
      theme,
      toolbar,
      type,
      anchorTarget,
      relValue,
      settings,
      ...rest,
    },
    { decorators }
  );
};

export { createLinkPlugin };
