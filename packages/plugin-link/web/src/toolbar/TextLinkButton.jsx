import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  hasLinksInSelection,
  getModalStyles,
  LinkButton,
  EditorModals,
} from 'wix-rich-content-editor-common';
import { LINK_TYPE } from '../types';
import { isEmpty } from 'lodash';

export default class TextLinkButton extends Component {
  showLinkPanel = () => {
    const {
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
      closeInlinePluginToolbar,
      config,
      innerModal,
      toolbarOffsetTop,
      toolbarOffsetLeft,
    } = this.props;
    const linkTypes = config[LINK_TYPE]?.linkTypes;
    const OriginalLinkPanel =
      !linkTypes || isEmpty(linkTypes) || !Object.values(linkTypes).find(addon => !!addon);
    const modalStyles = getModalStyles({
      fullScreen: !OriginalLinkPanel,
      isMobile,
      customStyles: {
        content: {
          position: 'fixed',
        },
      },
    });
    const commonPanelProps = {
      helpers,
      modalName: EditorModals.TEXT_LINK_MODAL,
      anchorTarget,
      relValue,
      theme,
      t,
      uiSettings,
      getEditorState,
      setEditorState,
      insertLinkFn,
      closeInlinePluginToolbar,
      linkTypes: config[LINK_TYPE]?.linkTypes,
    };
    if (isMobile || linkModal) {
      if (helpers && helpers.openModal) {
        const modalProps = {
          modalStyles,
          hidePopup: helpers.closeModal,
          isMobile,
          ...commonPanelProps,
        };
        helpers.openModal(modalProps);
      } else {
        //eslint-disable-next-line no-console
        console.error(
          'Open external helper function is not defined for toolbar button with keyName ' + keyName
        );
      }
    } else {
      const modalProps = {
        hidePopup: innerModal.closeInnerModal,
        top: toolbarOffsetTop,
        left: toolbarOffsetLeft,
        modalStyles: OriginalLinkPanel ? null : { maxWidth: 'none', padding: '0 19px' },
        ...commonPanelProps,
      };
      innerModal.openInnerModal(modalProps);
    }
  };

  get isActive() {
    return hasLinksInSelection(this.props.getEditorState());
  }

  render() {
    const { theme, isMobile, tabIndex, config, isActive, icon, tooltipText } = this.props;
    const buttonStyles = {
      button: theme.inlineToolbarButton,
      buttonWrapper: theme.inlineToolbarButton_wrapper,
      icon: theme.inlineToolbarButton_icon,
      active: theme.inlineToolbarButton_active,
    };
    const insertLinkIcon = config?.LINK?.toolbar?.icons?.InsertPluginButtonIcon || icon;
    return (
      <LinkButton
        onClick={this.showLinkPanel}
        isActive={isActive}
        theme={{ ...theme, ...buttonStyles }}
        isMobile={isMobile}
        tooltipText={tooltipText}
        tabIndex={tabIndex}
        icon={insertLinkIcon}
      />
    );
  }
}

TextLinkButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
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
  closeInlinePluginToolbar: PropTypes.func,
  tooltipText: PropTypes.string,
  innerModal: PropTypes.object,
  toolbarOffsetTop: PropTypes.string,
  toolbarOffsetLeft: PropTypes.string,
};
