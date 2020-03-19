import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  hasLinksInSelection,
  getModalStyles,
  LinkButton,
  EditorModals,
  decorateComponentWithProps,
} from 'wix-rich-content-editor-common';
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
      t,
      uiSettings,
      insertLinkFn,
      commonPubsub,
    } = this.props;
    const modalStyles = getModalStyles({ fullScreen: false, isMobile });
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
          hidePopup: helpers.closeModal,
          uiSettings,
          insertLinkFn,
          commonPubsub,
        };
        helpers.openModal(modalProps);
      } else {
        //eslint-disable-next-line no-console
        console.error(
          'Open external helper function is not defined for toolbar button with keyName ' + keyName
        );
      }
    } else {
      const linkPanelProps = {
        onExtendContent,
        onOverrideContent,
        anchorTarget,
        relValue,
        theme,
        t,
        uiSettings,
        getEditorState,
        setEditorState,
        insertLinkFn,
        commonPubsub,
      };
      const TextLinkPanelWithProps = decorateComponentWithProps(TextLinkPanel, linkPanelProps);
      onOverrideContent(TextLinkPanelWithProps);
    }
  };

  get isActive() {
    return hasLinksInSelection(this.props.getEditorState());
  }

  render() {
    const { theme, isMobile, tabIndex, config, isActive, icon: _icon, tooltipText } = this.props;
    const buttonStyles = {
      button: theme.inlineToolbarButton,
      buttonWrapper: theme.inlineToolbarButton_wrapper,
      icon: theme.inlineToolbarButton_icon,
      active: theme.inlineToolbarButton_active,
    };
    const icon = config?.LINK?.toolbar?.icons?.InsertPluginButtonIcon || _icon;
    return (
      <LinkButton
        onClick={this.showLinkPanel}
        isActive={isActive}
        theme={{ ...theme, ...buttonStyles }}
        isMobile={isMobile}
        tooltipText={tooltipText}
        tabIndex={tabIndex}
        icon={icon}
      />
    );
  }
}

TextLinkButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func,
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
  isActive: PropTypes.bool,
  insertLinkFn: PropTypes.func,
  icon: PropTypes.func,
  commonPubsub: PropTypes.object,
  tooltipText: PropTypes.string,
};
