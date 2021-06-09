import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InlineToolbarButton, hasBlockType } from 'wix-rich-content-editor-common';
import { CODE_BLOCK_TYPE } from '../types';
import { toggleBlockTypeAndEnsureSpaces } from './blockTypeModifiers';
import CodeBlockIcon from '../icons/CodeBlockIcon';

export default class TextCodeBlockButton extends Component {
  get isActive() {
    return hasBlockType(CODE_BLOCK_TYPE, this.props.getEditorState());
  }

  render() {
    const {
      theme,
      helpers,
      isMobile,
      t,
      tabIndex,
      setEditorState,
      getEditorState,
      config,
    } = this.props;
    const icon = config?.['code-block']?.toolbar?.icons?.InsertPluginButtonIcon || CodeBlockIcon;
    const onClick = () => {
      const editorState = getEditorState();
      const isAddEvent = !hasBlockType(CODE_BLOCK_TYPE, editorState);
      isAddEvent && helpers?.onPluginAdd?.(CODE_BLOCK_TYPE, 'FormattingToolbar');
      setEditorState(toggleBlockTypeAndEnsureSpaces(CODE_BLOCK_TYPE, editorState));
      isAddEvent && helpers?.onPluginAddSuccess?.(CODE_BLOCK_TYPE, 'FormattingToolbar');
    };
    return (
      <InlineToolbarButton
        onClick={onClick}
        isActive={this.isActive}
        helpers={helpers}
        theme={theme}
        isMobile={isMobile}
        tooltipText={t('TextCodeBlockButton_Tooltip')}
        dataHook={'TextCodeBlockButton'}
        tabIndex={tabIndex}
        icon={icon}
        pluginType={CODE_BLOCK_TYPE}
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
