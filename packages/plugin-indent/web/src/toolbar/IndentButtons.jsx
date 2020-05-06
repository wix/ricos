import React from 'react';
import PropTypes from 'prop-types';
import { InlineToolbarButton, indentSelectedBlock } from 'wix-rich-content-editor-common';
import decreaseIndentPluginIcon from '../icons/decreaseIndentPluginIcon.svg';
import increaseIndentPluginIcon from '../icons/increaseIndentPluginIcon.svg';

function indentButton(props, direction, tooltipKey, dataHook, icon) {
  const { theme, isMobile, t, tabIndex, setEditorState, getEditorState } = props;
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
  return indentButton(
    props,
    -1,
    'decreaseIndentButton_Tooltip',
    'decreaseIndentButton',
    decreaseIndentPluginIcon
  );
}

export function IncreaseIndentButton(props) {
  return indentButton(
    props,
    1,
    'increaseIndentButton_Tooltip',
    'increaseIndentButton',
    increaseIndentPluginIcon
  );
}

indentButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  config: PropTypes.object,
};
