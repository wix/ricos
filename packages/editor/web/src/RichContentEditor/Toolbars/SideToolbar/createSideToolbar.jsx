import React from 'react';
import SideToolbar from './SideToolbar';
import AddPluginFloatingToolbar from './AddPluginFloatingToolbar';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';
import { getPluginMenuTheme } from './utils';

const createSideToolbar = (data = {}) => {
  const {
    name = 'SideToolbar',
    pubsub,
    theme,
    structure = [],
    visibilityFn,
    offset,
    isMobile,
    displayOptions,
    toolbarDecorationFn,
    config,
  } = data;

  const toolbarProps = {
    pubsub,
    structure,
    theme,
    isMobile,
    offset,
    visibilityFn,
    displayOptions,
    toolbarDecorationFn,
    config,
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

export default ({
  buttons,
  offset,
  pubsub,
  theme,
  visibilityFn,
  isMobile,
  helpers,
  t,
  displayOptions,
  toolbarDecorationFn,
  config,
  addPluginMenuConfig,
}) => {
  const toolbarButtonTheme = getPluginMenuTheme(theme, isMobile);
  return createSideToolbar({
    offset,
    theme,
    visibilityFn,
    isMobile,
    displayOptions,
    toolbarDecorationFn,
    config,
    structure: [
      (
        { getEditorState, setEditorState } //eslint-disable-line
      ) => (
        <AddPluginFloatingToolbar
          getEditorState={getEditorState}
          setEditorState={setEditorState}
          theme={toolbarButtonTheme}
          structure={buttons}
          pubsub={pubsub}
          isMobile={isMobile}
          helpers={helpers}
          t={t}
          addPluginMenuConfig={addPluginMenuConfig}
        />
      ),
    ],
    pubsub,
  });
};
