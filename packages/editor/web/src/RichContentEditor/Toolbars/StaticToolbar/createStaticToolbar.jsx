import React from 'react';
import { camelCase } from 'lodash';
import StaticToolbar from './StaticToolbar';
import { simplePubsub } from 'wix-rich-content-editor-common';
import Styles from '../../../../statics/styles/static-toolbar.scss';
import classNames from 'classnames';
import { getLangDir } from 'wix-rich-content-common';

export default (data = {}) => {
  const pubsub = simplePubsub();

  const {
    name = 'StaticToolbar',
    theme,
    structure = [],
    isMobile = false,
    helpers,
    linkModal = false,
    anchorTarget,
    relValue,
    t,
    id,
    offset,
    visibilityFn,
    displayOptions,
    toolbarDecorationFn,
    renderTooltips = false,
    locale,
    setEditorState,
    config,
    defaultTextAlignment,
    footerToolbarConfig,
  } = data;

  const toolbarProps = {
    pubsub,
    defaultTextAlignment,
    structure,
    theme,
    isMobile,
    helpers,
    linkModal,
    anchorTarget,
    relValue,
    t,
    id,
    dataHook: camelCase(name),
    offset,
    visibilityFn,
    displayOptions,
    toolbarDecorationFn,
    renderTooltips,
    locale,
    setEditorState,
    config,
    footerToolbarConfig,
  };

  const staticToolbarClassName = classNames({
    [Styles.staticToolbarWrapper]: toolbarProps.isMobile,
  });

  return {
    name,
    initialize: ({ getEditorState, setEditorState }) => {
      pubsub.set('getEditorState', getEditorState);
      pubsub.set('setEditorState', setEditorState);
    },
    // Re-Render the text-toolbar on selection change
    onChange: editorState => {
      pubsub.set('selection', editorState.getSelection());
      return editorState;
    },
    Toolbar: props => (
      <div className={staticToolbarClassName} dir={getLangDir(locale)}>
        <StaticToolbar {...toolbarProps} {...props} />
      </div>
    ),
  };
};
