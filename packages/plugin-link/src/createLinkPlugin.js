import createLinkifyPlugin from 'draft-js-linkify-plugin';
import { createBasePlugin, decorateComponentWithProps } from 'wix-rich-content-common';
import { LINK_TYPE } from './types';
import { Strategy, Component } from './LinkDecorator';
import styles from '../statics/link-viewer.scss';
import createLinkToolbar from './toolbar/createLinkToolbar';

const createLinkPlugin = (config = {}) => {
  const type = LINK_TYPE;
  const {
    theme,
    anchorTarget,
    relValue,
    [type]: settings = {},
    ...rest
  } = config;
  const plugin = createLinkifyPlugin({ target: anchorTarget, rel: relValue, theme: theme || styles });

  const toolbar = createLinkToolbar(config);

  plugin.decorators.push({
    strategy: Strategy,
    component: decorateComponentWithProps(Component, { className: theme.link, anchorTarget, relValue }),
  });
  return createBasePlugin({
    theme,
    toolbar,
    type,
    anchorTarget,
    relValue,
    settings,
    ...rest
  }, plugin);
};

export { createLinkPlugin };
