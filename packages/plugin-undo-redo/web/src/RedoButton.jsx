import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import redoIcon from './icons/RedoIcon';
import { InlineToolbarButton, EditorState } from 'wix-rich-content-editor-common';

const RedoButton = props => {
  const {
    isMobile,
    theme = {},
    children,
    className,
    config,
    tabIndex,
    t,
    getEditorState,
    setEditorState,
  } = props;
  const editorState = getEditorState();
  const combinedClassName = classNames(theme.redo, className);
  const icon = config?.toolbar?.icons?.Redo || redoIcon();
  const disabled = editorState?.getRedoStack()?.isEmpty?.() || !editorState;

  const onClick = event => {
    event.stopPropagation();
    const newEditorState = EditorState.redo(getEditorState());
    if (isMobile && newEditorState.isInCompositionMode()) {
      // set isInComposition property of editorState to false forces draft to rerender
      newEditorState._immutable._map._root.nodes[3].entry[1] = false;
    }
    setEditorState(newEditorState);
  };

  if (isMobile) {
    return (
      <InlineToolbarButton
        disabled={disabled}
        onClick={onClick}
        isActive={false}
        theme={theme}
        isMobile={isMobile}
        tooltipText={t('redoButton_Tooltip')}
        dataHook={'redoButton'}
        tabindex={tabIndex}
        icon={redoIcon}
      >
        {children}
      </InlineToolbarButton>
    );
  } else
    return (
      <button
        tabIndex={tabIndex}
        disabled={disabled}
        onClick={onClick}
        className={combinedClassName}
      >
        {isMobile && icon}
        {children}
      </button>
    );
};

RedoButton.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.any,
  setEditorState: PropTypes.func,
  isMobile: PropTypes.bool,
  className: PropTypes.string,
  config: PropTypes.object,
  tabIndex: PropTypes.number,
  t: PropTypes.func,
  getEditorState: PropTypes.func,
};

export default RedoButton;
