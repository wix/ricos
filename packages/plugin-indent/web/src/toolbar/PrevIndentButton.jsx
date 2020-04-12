import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InlineToolbarButton, onIndent } from 'wix-rich-content-editor-common';
import { INDENT_TYPE } from '../types';
import PrevIndentPluginIcon from '../icons/PrevIndentPluginIcon.svg';

export default class PrevIndentButton extends Component {
  render() {
    const { theme, isMobile, t, tabIndex, setEditorState, getEditorState, config } = this.props;
    const icon =
      config?.[INDENT_TYPE]?.toolbar?.icons?.InsertPluginButtonIcon || PrevIndentPluginIcon;
    return (
      <InlineToolbarButton
        onClick={() => {
          // eslint-disable-next-line no-restricted-globals
          const editorState = getEditorState();
          const newState = onIndent(false, editorState, 4);
          if (newState !== editorState) {
            setEditorState(newState);
          }
        }}
        // isActive={this.isActive}
        theme={theme}
        isMobile={isMobile}
        tooltipText={t('PrevIndentButton_Tooltip')}
        dataHook={'PrevIndentButton'}
        tabIndex={tabIndex}
        icon={icon}
      />
    );
  }
}

PrevIndentButton.propTypes = {
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
