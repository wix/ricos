import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { removeLinksInSelection, InlineToolbarButton } from 'wix-rich-content-editor-common';
import { RemoveLinkIcon } from '../icons';

export default class RemoveLinkButton extends Component {
  deleteLink = () => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const newEditorState = removeLinksInSelection(editorState, setEditorState);
    setEditorState(newEditorState);
    this.props.commonPubsub.set('cursorOnInlinePlugin', null);
  };

  render() {
    const { theme, isMobile, t, tabIndex, config } = this.props;
    const linkButtonTooltip = t('TextLinkButton_Tooltip');
    const buttonStyles = {
      button: theme.inlineToolbarButton,
      buttonWrapper: theme.inlineToolbarButton_wrapper,
      icon: theme.inlineToolbarButton_icon,
      active: theme.inlineToolbarButton_active,
    };
    const icon = config?.LINK?.toolbar?.icons?.InsertPluginButtonIcon || RemoveLinkIcon;
    return (
      <InlineToolbarButton
        onClick={this.deleteLink}
        theme={{ ...theme, ...buttonStyles }}
        isMobile={isMobile}
        tooltipText={linkButtonTooltip}
        tabIndex={tabIndex}
        icon={icon}
        dataHook={'RemoveLinkButton'}
      />
    );
  }
}

RemoveLinkButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  linkModal: PropTypes.bool,
  helpers: PropTypes.object,
  keyName: PropTypes.string,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  uiSettings: PropTypes.object,
  config: PropTypes.object,
  commonPubsub: PropTypes.object,
};
