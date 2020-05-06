import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InlineToolbarButton, indentSelectedBlock } from 'wix-rich-content-editor-common';
import decreaseIndentPluginIcon from '../icons/decreaseIndentPluginIcon.svg';

export default class DecreaseIndentButton extends Component {
  render() {
    const { theme, isMobile, t, tabIndex, setEditorState, getEditorState } = this.props;
    return (
      <InlineToolbarButton
        onClick={() => {
          const editorState = getEditorState();
          const newState = indentSelectedBlock(editorState, -1);
          if (newState !== editorState) {
            setEditorState(newState);
          }
        }}
        theme={theme}
        isMobile={isMobile}
        tooltipText={t('decreaseIndentButton_Tooltip')}
        dataHook={'decreaseIndentButton'}
        tabIndex={tabIndex}
        icon={decreaseIndentPluginIcon}
      />
    );
  }
}

DecreaseIndentButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  config: PropTypes.object,
};
