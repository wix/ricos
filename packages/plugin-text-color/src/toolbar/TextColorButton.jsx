import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getModalStyles, InlineToolbarButton } from 'wix-rich-content-common';
import TextColorIcon from './TextColorIcon';
import { TEXT_COLOR_TYPE } from '../types';
import { MODAL_STYLES, PANEL_WIDTH } from './constants';
import { Modals } from '../modals';

export default class TextColorButton extends Component {
  showTextColorPanel = () => {
    const {
      getEditorState,
      setEditorState,
      theme,
      isMobile,
      helpers,
      keyName,
      anchorTarget,
      relValue,
      t,
      uiSettings,
      config,
    } = this.props;
    const settings = config[TEXT_COLOR_TYPE];

    const modalStyles = getModalStyles({
      fullScreen: false,
      customStyles: {
        content: { ...MODAL_STYLES.content, ...this.calculatePanelLocation(this.element) },
        overlay: MODAL_STYLES.overlay,
      },
    });
    if (helpers && helpers.openModal) {
      this.props.setKeepOpen(true);
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
        modalName: Modals.TEXT_COLOR_PICKER,
        hidePopup: helpers.closeModal,
        uiSettings,
        settings,
        setKeepToolbarOpen: this.props.setKeepOpen,
      };
      helpers.openModal(modalProps);
    } else {
      //eslint-disable-next-line no-console
      console.error(
        'Open external helper function is not defined for toolbar button with keyName ' + keyName
      );
    }
  };

  calculatePanelLocation = buttonRef => {
    if (!buttonRef) {
      return {};
    }
    const { bottom, left } = buttonRef.getBoundingClientRect();
    const panelTop = bottom - 10;
    const panelLeft = left - PANEL_WIDTH / 2;
    return { top: panelTop, left: panelLeft };
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
      <div ref={ref => (this.element = ref)}>
        <InlineToolbarButton
          onClick={this.showTextColorPanel}
          isActive={this.isActive}
          theme={{ ...theme, ...buttonStyles }}
          isMobile={isMobile}
          tooltipText={tooltip}
          tabIndex={tabIndex}
          icon={TextColorIcon}
        />
      </div>
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
  config: PropTypes.object,
  setKeepOpen: PropTypes.func,
};

TextColorButton.defaultProps = {
  setKeepOpen: () => {},
};
