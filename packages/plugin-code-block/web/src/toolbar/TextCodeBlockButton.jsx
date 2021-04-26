import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InlineToolbarButton } from 'wix-rich-content-editor-common';
import { CODE_BLOCK_TYPE } from '../types';
import { hasBlockType, toggleBlockTypeAndEnsureSpaces } from './blockTypeModifiers';
import CodeBlockIcon from '../icons/CodeBlockIcon';

export default class TextCodeBlockButton extends Component {
  get isActive() {
    return hasBlockType(CODE_BLOCK_TYPE, this.props.getEditorState());
  }

  render() {
    const { theme, isMobile, t, tabIndex, setEditorState, getEditorState, config } = this.props;
    const icon = config?.['code-block']?.toolbar?.icons?.InsertPluginButtonIcon || CodeBlockIcon;
    return (
      <InlineToolbarButton
        onClick={() =>
          setEditorState(toggleBlockTypeAndEnsureSpaces(CODE_BLOCK_TYPE, getEditorState()))
        }
        isActive={this.isActive}
        theme={theme}
        isMobile={isMobile}
        tooltipText={t('TextCodeBlockButton_Tooltip')}
        dataHook={'TextCodeBlockButton'}
        tabIndex={tabIndex}
        icon={icon}
      />
    );
  }
}

TextCodeBlockButton.propTypes = {
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
