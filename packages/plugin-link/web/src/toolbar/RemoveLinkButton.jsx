import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { removeLinksInSelection } from 'wix-rich-content-editor-common';
import { InlineToolbarButton } from 'wix-rich-content-ui-components';
import RemoveLinkIcon from '../icons/RemoveLinkIcon';
import { LINK_TYPE } from '../types';

export default class RemoveLinkButton extends Component {
  deleteLink = () => {
    const { getEditorState, setEditorState, closeInlinePluginToolbar } = this.props;
    const newEditorState = removeLinksInSelection(getEditorState(), setEditorState);
    setEditorState(newEditorState);
    closeInlinePluginToolbar();
  };

  render() {
    const { theme, helpers, isMobile, t, tabIndex } = this.props;
    const linkButtonTooltip = t('LinkPanelContainer_RemoveButton');
    const buttonStyles = {
      button: theme.inlineToolbarButton,
      buttonWrapper: theme.inlineToolbarButton_wrapper,
      icon: theme.inlineToolbarButton_icon,
      active: theme.inlineToolbarButton_active,
    };
    return (
      <InlineToolbarButton
        onClick={this.deleteLink}
        helpers={helpers}
        theme={{ ...theme, ...buttonStyles }}
        isMobile={isMobile}
        tooltipText={linkButtonTooltip}
        tabIndex={tabIndex}
        icon={RemoveLinkIcon}
        dataHook={'RemoveLinkButton'}
        pluginType={LINK_TYPE}
      />
    );
  }
}

RemoveLinkButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  helpers: PropTypes.object,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  closeInlinePluginToolbar: PropTypes.func,
};
