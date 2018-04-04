import createBasePlugin from '../base/basePlugin';
import { EXTERNAL_LINK_TYPE } from './types';
import { Strategy, Component } from './decorator';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
// eslint-disable-next-line no-trailing-spaces
import linkifyStyles from '~/Styles/text-link.scss';//TODO: Alex, this file should be inside the plugin lib and have no reference to the global styles
import decorateComponentWithProps from 'decorate-component-with-props';

const createLinkPlugin = (config = {}) => {
  const type = EXTERNAL_LINK_TYPE;
  const { decorator, helpers, theme, isMobile, t, anchorTarget, relValue } = config;
  const plugin = createLinkifyPlugin({ target: '_blank', rel: relValue, theme: theme || linkifyStyles });

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

export { createLinkPlugin, EXTERNAL_LINK_TYPE };
