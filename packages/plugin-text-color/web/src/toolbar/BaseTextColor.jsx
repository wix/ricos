import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import { getSelectionStyles, getCumulativeOffset } from 'wix-rich-content-plugin-commons';
import {
  decorateComponentWithProps,
  getModalStyles,
  InlineToolbarButton,
  EditorState,
} from 'wix-rich-content-editor-common';
import TextColorPanel from './TextColorPanel';
import { PANEL_WIDTH, DEFAULT_STYLE_SELECTION_PREDICATE } from '../constants';
import styles from '../../statics/styles/text-color-modal.scss';
import { styleMapper } from '../text-decorations-utils';

export default class BaseTextColor extends Component {
  constructor(props) {
    super(props);
    this.state = { showPanel: false };
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.buttonRef = props.buttonRef;
    this.styleMapper = styleMapper(props.pluginParams.type);
  }

  static getModalParent() {
    return document.querySelector('.DraftEditor-root').parentNode;
  }

  // relies on helpers.openModal
  openMobilePanel(modalElement) {
    const { helpers } = this.props;
    // TODO: CSS styles to inline style
    // this.styles.textColorModal_mobile
    // this.styles.textColorModalOverlay_mobile
    const modalStyles = getModalStyles({
      fullScreen: true,
      isMobile: true,
      customStyles: {
        content: {
          top: 'unset',
          left: 0,
          backgroundColor: 'white',
        },
      },
    });

    helpers.openModal?.({
      modalStyles,
      modalElement,
      isMobile: true,
    });
  }

  // relies on innerModal mechanism
  openDesktopPanel(modalElement) {
    const { innerModal, setKeepOpen, config, pluginParams } = this.props;
    setKeepOpen?.(true);
    const settings = config[pluginParams.type];
    let position = {};
    if (settings.positionPicker) {
      position = settings.positionPicker(this.buttonRef, PANEL_WIDTH);
    } else {
      const { bottom, left } = this.buttonRef.current.getBoundingClientRect();
      position = { left: left - PANEL_WIDTH / 2, top: bottom };
    }
    const { offsetTop, offsetLeft } = getCumulativeOffset(innerModal.getContainer(), 0, 0);
    const modalProps = {
      top: position.top - offsetTop,
      left: position.left - offsetLeft,
      modalElement,
      modalStyles: {
        marginTop: 15,
        borderRadius: 2,
        minWidth: 184,
        maxWidth: 209,
      },
    };
    innerModal.openInnerModal(modalProps);
  }

  openPanel = () => {
    const {
      setKeepOpen,
      config,
      pluginParams,
      t,
      isMobile,
      theme,
      getEditorState,
      setEditorState,
      uiSettings,
    } = this.props;
    const modalElement = decorateComponentWithProps(TextColorPanel, {
      t,
      isMobile,
      theme,
      closeModal: this.closePanel,
      editorState: getEditorState(),
      setEditorState,
      settings: config[pluginParams.type],
      uiSettings,
      setKeepToolbarOpen: setKeepOpen,
      styleMapper: this.styleMapper,
      predicate: pluginParams.predicate,
      defaultColor: pluginParams.defaultColor,
    });
    if (isMobile) {
      this.openMobilePanel(modalElement);
    } else {
      this.openDesktopPanel(modalElement);
    }
  };

  closePanel = editorState => {
    const { helpers, isMobile, innerModal, setKeepOpen } = this.props;

    if (isMobile) {
      helpers.closeModal?.();
    } else {
      setKeepOpen?.(false);
      innerModal.closeInnerModal();
    }
    this.preserveSelectionState(editorState);
  };

  preserveSelectionState(newEditorState) {
    const { setEditorState, getEditorState } = this.props;
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    setEditorState(EditorState.forceSelection(newEditorState || editorState, selection));
  }

  get isActive() {
    const { config, pluginParams, getEditorState } = this.props;
    const settings = config[pluginParams.type] || {};
    const styleSelectionPredicate = pluginParams.predicate(
      settings.styleSelectionPredicate || DEFAULT_STYLE_SELECTION_PREDICATE
    );
    return getSelectionStyles(styleSelectionPredicate, getEditorState()).length > 0;
  }

  render() {
    const {
      theme,
      isMobile,
      t,
      tabIndex,
      setEditorState,
      getEditorState,
      setKeepOpen,
      config,
      uiSettings,
      pluginParams,
    } = this.props;
    const settings = config[pluginParams.type];
    const { isPanelOpen, panelTop, panelLeft } = this.state;
    const tooltip = t(pluginParams.toolTip);
    const buttonStyles = {
      button: theme.inlineToolbarButton,
      buttonWrapper: theme.inlineToolbarButton_wrapper,
      icon: theme.inlineToolbarButton_icon,
      active: theme.inlineToolbarButton_active,
    };

    return (
      <InlineToolbarButton
        onClick={this.openPanel}
        isActive={this.isActive}
        theme={{ ...theme, ...buttonStyles }}
        isMobile={isMobile}
        tooltipText={tooltip}
        dataHook={pluginParams.dataHook}
        tabIndex={tabIndex}
        icon={pluginParams.icon}
        forwardRef={this.buttonRef}
      />
    );
  }
}

BaseTextColor.propTypes = {
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
  pluginParams: PropTypes.object.isRequired,
  buttonRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.func })]),
  innerModal: PropTypes.object.isRequired,
};

BaseTextColor.defaultProps = {
  setKeepOpen: () => {},
};
