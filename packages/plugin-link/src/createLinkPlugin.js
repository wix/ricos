import createLinkifyPlugin from 'draft-js-linkify-plugin';
import { createBasePlugin, decorateComponentWithProps } from 'wix-rich-content-common';
import { LINK_TYPE } from './types';
import { Strategy, Component } from './LinkDecorator';
import DynamicLink from './DynamicLink';
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
  const toolbar = createLinkToolbar(config);
  const linkProps = {
    className: theme.link,
    anchorTarget,
    relValue,
    settings,
  };

  const LinkEntityComponent = decorateComponentWithProps(Component, linkProps);
  const DynamicLinkComponent = decorateComponentWithProps(DynamicLink, linkProps);

  const plugin = createLinkifyPlugin({
    component: DynamicLinkComponent,
    target: anchorTarget,
    rel: relValue,
    theme: theme || styles
  });
  plugin.decorators.push({ strategy: Strategy, component: LinkEntityComponent });

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
