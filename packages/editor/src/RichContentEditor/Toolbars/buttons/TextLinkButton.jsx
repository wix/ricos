import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from 'decorate-component-with-props';
import { hasLinksInSelection, getModalStyles, LinkButton, EditorModals } from 'wix-rich-content-common';
import TextLinkPanel from './TextLinkPanel';

export default class TextLinkButton extends Component {
  showLinkPanel = () => {
    const {
      onExtendContent,
      onOverrideContent,
      getEditorState,
      setEditorState,
      theme,
      isMobile,
      linkModal,
      helpers,
      keyName,
      anchorTarget,
      relValue,
      t
    } = this.props;
    const modalStyles = getModalStyles({ fullScreen: false });
    if (isMobile || linkModal) {
      if (helpers && helpers.openModal) {
        const modalProps = {
          helpers,
          modalStyles,
          isMobile,
          getEditorState,
          setEditorState,
          t,
          theme,
          anchorTarget,
          relValue,
          modalName: EditorModals.MOBILE_TEXT_LINK_MODAL,
          hidePopup: helpers.closeModal
        };
        helpers.openModal(modalProps);
      } else {
        console.error('Open external helper function is not defined for toolbar button with keyName ' + keyName); //eslint-disable-line no-console
      }
    } else {
      const linkPanelProps = {
        onExtendContent,
        onOverrideContent,
        anchorTarget,
        relValue,
        theme,
        t,
      };
      const TextLinkPanelWithProps = decorateComponentWithProps(TextLinkPanel, linkPanelProps);
      onOverrideContent(TextLinkPanelWithProps);
    }
  }

  get isActive() {
    return hasLinksInSelection(this.props.getEditorState());
  }

  render() {
    const { theme, isMobile, t, tabIndex } = this.props;
    const linkButtonTooltip = t('TextLinkButton_Tooltip');
    const buttonStyles = {
      button: theme.inlineToolbarButton,
      buttonWrapper: theme.inlineToolbarButton_wrapper,
      icon: theme.inlineToolbarButton_icon,
      active: theme.inlineToolbarButton_active,
    };
    return (<LinkButton
      onClick={this.showLinkPanel}
      isActive={this.isActive}
      theme={{ ...theme, ...buttonStyles }}
      isMobile={isMobile}
      tooltipText={linkButtonTooltip}
      tabIndex={tabIndex}
    />);
  }
}

TextLinkButton.propTypes = {
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
};
