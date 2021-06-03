import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import undoIcon from './icons/UndoIcon';
import { InlineToolbarButton, undo, pluginsUndo } from 'wix-rich-content-editor-common';

const UndoButton = props => {
  const {
    isMobile,
    theme = {},
    helpers,
    children,
    className,
    config,
    tabIndex,
    t,
    getEditorState,
    setEditorState,
    commonPubsub,
  } = props;
  const editorState = getEditorState();
  const combinedClassName = classNames(theme.undo, className);
  const icon = config?.toolbar?.icons?.Undo || undoIcon;
  const disabled = editorState?.getUndoStack()?.isEmpty?.() || !editorState;
  const isUndoExperiment = commonPubsub.get('undoExperiment')?.();

  const onClick = event => {
    event.stopPropagation();
    setEditorState(isUndoExperiment ? pluginsUndo(getEditorState()) : undo(getEditorState()));
  };

  if (isMobile)
    return (
      <InlineToolbarButton
        disabled={disabled}
        onClick={onClick}
        isActive={false}
        helpers={helpers}
        theme={theme}
        isMobile={isMobile}
        tooltipText={t('UndoButton_Tooltip')}
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
  helpers: PropTypes.object,
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
