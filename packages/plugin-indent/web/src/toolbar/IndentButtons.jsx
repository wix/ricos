import React from 'react';
import PropTypes from 'prop-types';
import { InlineToolbarButton, indentSelectedBlock } from 'wix-rich-content-editor-common';
import decreaseIndentPluginIcon from '../icons/decreaseIndentPluginIcon.svg';
import increaseIndentPluginIcon from '../icons/increaseIndentPluginIcon.svg';

function indentButton(props) {
  const {
    theme,
    isMobile,
    t,
    tabIndex,
    setEditorState,
    getEditorState,
    direction,
    tooltipKey,
    dataHook,
    icon,
  } = props;
  return (
    <InlineToolbarButton
      onClick={() => {
        const editorState = getEditorState();
        const newState = indentSelectedBlock(editorState, direction);
        if (newState !== editorState) {
          setEditorState(newState);
        }
      }}
      theme={theme}
      isMobile={isMobile}
      tooltipText={t(tooltipKey)}
      dataHook={dataHook}
      tabIndex={tabIndex}
      icon={icon}
    />
  );
}

export function DecreaseIndentButton(props) {
  return indentButton({
    ...props,
    direction: -1,
    tooltipKey: 'decreaseIndentButton_Tooltip',
    dataHook: 'decreaseIndentButton',
    icon: decreaseIndentPluginIcon,
  });
}

export function IncreaseIndentButton(props) {
  return indentButton({
    ...props,
    direction: 1,
    tooltipKey: 'increaseIndentButton_Tooltip',
    dataHook: 'increaseIndentButton',
    icon: increaseIndentPluginIcon,
  });
}

indentButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  config: PropTypes.object,
  direction: PropTypes.number,
  tooltipKey: PropTypes.string,
  dataHook: PropTypes.string,
  icon: PropTypes.object,
};
