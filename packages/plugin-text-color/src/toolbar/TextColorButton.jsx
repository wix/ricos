import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getModalStyles, InlineToolbarButton, getSelectionStyles } from 'wix-rich-content-common';
import TextColorIcon from './TextColorIcon';
import { TEXT_COLOR_TYPE } from '../types';
import { MODAL_STYLES, PANEL_WIDTH, DEFAULT_STYLE_SELECTION_PREDICATE } from '../constants';
import { Modals } from '../modals';

export default class TextColorButton extends Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }

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

    const styles = isMobile ? MODAL_STYLES.mobile : MODAL_STYLES.desktop;

    const modalStyles = getModalStyles({
      fullScreen: false,
      customStyles: {
        content: { ...styles.content, ...this.calculatePanelLocation(this.buttonRef.current) },
        overlay: styles.overlay,
      },
    });
    if (helpers && helpers.openModal) {
      if (!isMobile) {
        this.props.setKeepOpen(true);
      }
      const modalProps = {
        helpers,
        modalStyles,
        isMobile,
        editorState: getEditorState(),
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
    if (this.props.isMobile) {
      return {};
    }
    if (!buttonRef) {
      return {};
    }
    const { bottom, left } = buttonRef.getBoundingClientRect();
    const panelTop = bottom + 50;
    const panelLeft = left - PANEL_WIDTH / 2;
    return { top: panelTop, left: panelLeft };
  };

  get isActive() {
    const settings = this.props.config[TEXT_COLOR_TYPE] || {};
    const styleSelectionPredicate =
      settings.styleSelectionPredicate || DEFAULT_STYLE_SELECTION_PREDICATE;
    return getSelectionStyles(styleSelectionPredicate, this.props.getEditorState()).length > 0;
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
        forwardRef={this.buttonRef}
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
  config: PropTypes.object,
  setKeepOpen: PropTypes.func,
};

TextColorButton.defaultProps = {
  setKeepOpen: () => {},
};
