import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InlineToolbarButton, onIndent } from 'wix-rich-content-editor-common';
import { INDENT_TYPE } from '../types';
import NextIndentPluginIcon from '../icons/NextIndentPluginIcon.svg';

export default class NextIndentButton extends Component {
  render() {
    const { theme, isMobile, t, tabIndex, setEditorState, getEditorState, config } = this.props;
    const icon =
      config?.[INDENT_TYPE]?.toolbar?.icons?.InsertPluginButtonIcon || NextIndentPluginIcon;
    return (
      <InlineToolbarButton
        onClick={() => {
          // eslint-disable-next-line no-restricted-globals
          const editorState = getEditorState();
          const newState = onIndent(true, editorState);
          if (newState !== editorState) {
            setEditorState(newState);
          }
        }}
        // isActive={true}
        theme={theme}
        isMobile={isMobile}
        tooltipText={t('NextIndentButton_Tooltip')}
        dataHook={'NextIndentButton'}
        tabIndex={tabIndex}
        icon={icon}
      />
    );
  }
}

NextIndentButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  helpers: PropTypes.object,
  keyName: PropTypes.string,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  config: PropTypes.object,
};
