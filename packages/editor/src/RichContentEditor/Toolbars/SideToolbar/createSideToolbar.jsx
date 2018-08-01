import React from 'react';
import get from 'lodash/get';
import SideToolbar from './SideToolbar';
import AddPluginFloatingToolbar from './AddPluginFloatingToolbar';
import { simplePubsub, decorateComponentWithProps, WixUtils } from 'wix-rich-content-common';

const createSideToolbar = (config = {}) => {
  const {
    name = 'SideToolbar',
    pubsub = simplePubsub({ isVisible: false }),
    theme,
    structure = [],
    offset = {
      desktop: { x: -40, y: 0 },
      mobile: {
        ios: { x: 0, y: 0 },
        android: { x: 0, y: 50 },
      }
    },
    isMobile,
  } = config;

  const offsetPath = !isMobile ? 'desktop' : WixUtils.isiOS() ? 'mobile.ios' : 'mobile.android';

  const toolbarProps = {
    pubsub,
    structure,
    theme,
    isMobile,
    offset: get(offset, offsetPath),
  };

  return {
    name,
    initialize: ({ setEditorState, getEditorState }) => {
      pubsub.set('getEditorState', getEditorState);
      pubsub.set('setEditorState', setEditorState);
    },
    onChange: editorState => {
      pubsub.set('editorState', editorState);
      return editorState;
    },
    SideToolbar: decorateComponentWithProps(SideToolbar, toolbarProps),
  };
};

export default ({ buttons, offset, pubsub, theme, isMobile, helpers, t }) => {

  const { buttonStyles, ...rest } = theme;
  const toolbarButtonTheme = {
    buttonStyles: {
      button: buttonStyles.sideToolbarButton,
      buttonWrapper: buttonStyles.sideToolbarButton_wrapper,
      icon: buttonStyles.sideToolbarButton_icon,
      label: buttonStyles.sideToolbarButton_label,
    },
    ...rest
  };
  return createSideToolbar({
    offset,
    theme,
    isMobile,
    structure: [
      ({ getEditorState, setEditorState, theme }) => //eslint-disable-line
        (<AddPluginFloatingToolbar
          getEditorState={getEditorState}
          setEditorState={setEditorState}
          theme={toolbarButtonTheme}
          structure={buttons}
          pubsub={pubsub}
          isMobile={isMobile}
          helpers={helpers}
          t={t}
        />),
    ],
  });
};
