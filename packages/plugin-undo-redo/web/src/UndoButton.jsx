import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import undoIcon from './icons/UndoIcon';
import { InlineToolbarButton } from 'wix-rich-content-editor-common';
import { undo } from './utils';

const UndoButton = props => {
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
  const combinedClassName = classNames(theme.undo, className);
  const icon = config?.toolbar?.icons?.Undo || undoIcon;
  const disabled = editorState?.getUndoStack()?.isEmpty?.() || !editorState;

  const onClick = event => {
    event.stopPropagation();
    setEditorState(undo(getEditorState()));
  };

  if (isMobile)
    return (
      <InlineToolbarButton
        disabled={disabled}
        onClick={onClick}
        isActive={false}
        theme={theme}
        isMobile={isMobile}
        tooltipText={t('undoButton_Tooltip')}
        dataHook={'undoButton'}
        tabIndex={tabIndex}
        icon={icon}
      >
        {children}
      </InlineToolbarButton>
    );
  else
    return (
      <button
        tabIndex={tabIndex}
        disabled={disabled}
        onClick={onClick}
        className={combinedClassName}
      >
        {children}
      </button>
    );
};

UndoButton.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.any,
  setEditorState: PropTypes.func,
  isMobile: PropTypes.bool,
  className: PropTypes.string,
  config: PropTypes.object,
  tabIndex: PropTypes.number,
  t: PropTypes.func,
  getEditorState: PropTypes.func,
  commonPubsub: PropTypes.object,
};

export default UndoButton;
