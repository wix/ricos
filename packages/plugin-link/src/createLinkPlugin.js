import createLinkifyPlugin from 'draft-js-linkify-plugin';
import { createBasePlugin } from 'wix-rich-content-common';
import { LINK_TYPE } from './types';
import { Component } from './LinkComponent';
import { linkEntityStrategy } from './strategy';
import styles from '../statics/link-viewer.scss';
import createLinkToolbar from './toolbar/createLinkToolbar';

const createLinkPlugin = (config = {}) => {
  const type = LINK_TYPE;
  const { theme, anchorTarget, relValue, [type]: settings = {}, ...rest } = config;
  const toolbar = createLinkToolbar(config);

  const decorators = [];
  if (settings.autoLink !== false) {
    decorators.push(
      createLinkifyPlugin({
        component: Component,
        target: anchorTarget,
        rel: relValue,
        theme: theme || styles,
      }).decorators[0]
    );
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
