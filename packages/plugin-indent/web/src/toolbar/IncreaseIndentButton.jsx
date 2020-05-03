import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InlineToolbarButton, onIndent } from 'wix-rich-content-editor-common';
import increaseIndentPluginIcon from '../icons/increaseIndentPluginIcon.svg';

export default class IncreaseIndentButton extends Component {
  render() {
    const { theme, isMobile, t, tabIndex, setEditorState, getEditorState } = this.props;
    return (
      <InlineToolbarButton
        onClick={() => {
          const editorState = getEditorState();
          const newState = onIndent(true, editorState);
          if (newState !== editorState) {
            setEditorState(newState);
          }
        }}
        theme={theme}
        isMobile={isMobile}
        tooltipText={t('increaseIndentButton_Tooltip')}
        dataHook={'increaseIndentButton'}
        tabIndex={tabIndex}
        icon={increaseIndentPluginIcon}
      />
    );
  }
}

IncreaseIndentButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  config: PropTypes.object,
};
