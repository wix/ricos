import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  getModalStyles,
  InlineToolbarButton,
  EditorModals,
  decorateComponentWithProps,
} from 'wix-rich-content-common';
import TextColorIcon from './TextColorIcon';
import TextColorPanel from './TextColorPanel';

export default class TextColorButton extends Component {
  showTextColorPanel = () => {
    const {
      onExtendContent,
      onOverrideContent,
      getEditorState,
      setEditorState,
      theme,
      isMobile,
      textColorModal,
      helpers,
      keyName,
      anchorTarget,
      relValue,
      t,
      uiSettings,
    } = this.props;
    const modalStyles = getModalStyles({ fullScreen: false });
    if (isMobile || textColorModal) {
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
          modalName: EditorModals.MOBILE_TEXT_COLOR_MODAL,
          hidePopup: helpers.closeModal,
          uiSettings,
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
      };
      const TextColorPanelWithProps = decorateComponentWithProps(TextColorPanel, linkPanelProps);
      onOverrideContent(TextColorPanelWithProps);
    }
  };

  // TODO: check if has text color inline style and such single style is in selection
  get isActive() {
    return false; // this.hasInlineColorInSelection(this.props.getEditorState());
  }

  render() {
    const { theme, isMobile, t, tabIndex } = this.props;
    const tooltip = t('TextColorButton_Tooltip');
    const buttonStyles = {
      button: theme.inlineToolbarButton,
      buttonWrapper: theme.inlineToolbarButton_wrapper,
      icon: theme.inlineToolbarButton_icon,
      active: theme.inlineToolbarButton_active,
    };
    return (
      <InlineToolbarButton
        onClick={this.showTextColorPanel}
        isActive={this.isActive}
        theme={{ ...theme, ...buttonStyles }}
        isMobile={isMobile}
        tooltipText={tooltip}
        tabIndex={tabIndex}
        icon={TextColorIcon}
      />
    );
  }
}

TextColorButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  textColorModal: PropTypes.bool,
  helpers: PropTypes.object,
  keyName: PropTypes.string,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  uiSettings: PropTypes.object,
};
