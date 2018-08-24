import createLinkifyPlugin from 'draft-js-linkify-plugin';
import { createBasePlugin, decorateComponentWithProps } from 'wix-rich-content-common';
import { EXTERNAL_LINK_TYPE } from './types';
import { Strategy, Component } from './LinkDecorator';
import styles from '../statics/link-viewer.scss';
import createLinkToolbar from './toolbar/createLinkToolbar';

const createLinkPlugin = (config = {}) => {
  const type = EXTERNAL_LINK_TYPE;
  const { decorator, helpers, theme, isMobile, t, anchorTarget, relValue, getEditorState, setEditorState, link: settings } = config;
  const plugin = createLinkifyPlugin({ target: anchorTarget, rel: relValue, theme: theme || styles });

  const toolbar = createLinkToolbar({ helpers, theme, isMobile, t, anchorTarget, relValue, getEditorState, setEditorState, settings });

  plugin.decorators.push({
    strategy: Strategy,
    component: decorateComponentWithProps(Component, { className: theme.link, anchorTarget, relValue }),
  });
  return createBasePlugin({
    decorator,
    theme,
    toolbar,
    type,
    helpers,
    isMobile,
    anchorTarget,
    relValue,
    t
  }, plugin);
};

export { createLinkPlugin };
