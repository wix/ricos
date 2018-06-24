import createLinkifyPlugin from 'draft-js-linkify-plugin';
import decorateComponentWithProps from 'decorate-component-with-props';
import { createBasePlugin } from 'wix-rich-content-common';
import { EXTERNAL_LINK_TYPE } from './types';
import { Strategy, Component } from './decorator';
import styles from '../statics/link-viewer.scss';

const createLinkPlugin = (config = {}) => {
  const type = EXTERNAL_LINK_TYPE;
  const { decorator, helpers, theme, isMobile, t, anchorTarget, relValue } = config;
  const plugin = createLinkifyPlugin({ target: '_blank', rel: relValue, theme: theme || styles });

  plugin.decorators.push({
    strategy: Strategy,
    component: decorateComponentWithProps(Component, { className: theme.link, anchorTarget, relValue }),
  });
  return createBasePlugin({
    decorator,
    theme,
    type,
    helpers,
    isMobile,
    anchorTarget,
    relValue,
    t
  }, plugin);
};

export { createLinkPlugin };
