import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from 'react-modal';
import ClickOutside from 'react-click-outsider';

import { mergeStyles } from 'wix-rich-content-common';
import { getSelectionStyles } from 'wix-rich-content-plugin-commons';
import { InlineToolbarButton, EditorState } from 'wix-rich-content-editor-common';
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

  openPanel = () => {
    const { isMobile, setKeepOpen, config, pluginParams } = this.props;
    if (!isMobile) {
      setKeepOpen && setKeepOpen(true);
    }

    const settings = config[pluginParams.type];
    let position = {};
    if (settings.positionPicker) {
      position = settings.positionPicker(this.buttonRef, PANEL_WIDTH);
    } else {
      const { bottom, left } = this.buttonRef.current.getBoundingClientRect();
      position = { left: left - PANEL_WIDTH / 2, top: bottom };
    }
    this.setState({ isPanelOpen: true, panelLeft: position.left, panelTop: position.top });
  };

  closePanel = editorState => {
    this.setState({ isPanelOpen: false });
    this.props.setKeepOpen(false);
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
      toolbarName,
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

    const modalStyle = {
      content: isMobile
        ? {
            top: 'unset',
            left: 0,
            backgroundColor: 'white',
          }
        : {
            top: panelTop,
            left: panelLeft,
            marginTop: 15,
            borderRadius: 2,
            width: 184,
          },
    };

    if (isMobile || toolbarName !== 'StaticTextToolbar' || !settings.inlinePopups) {
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
        >
          <Modal
            onRequestClose={() => this.closePanel()}
            isOpen={isPanelOpen}
            parentSelector={BaseTextColor.getModalParent}
            className={classNames({
              [this.styles.textColorModal]: !isMobile,
              [this.styles.textColorModal_mobile]: isMobile,
            })}
            overlayClassName={classNames({
              [this.styles.textColorModalOverlay]: !isMobile,
              [this.styles.textColorModalOverlay_mobile]: isMobile,
            })}
            style={modalStyle}
            ariaHideApp={false}
          >
            <TextColorPanel
              t={t}
              isMobile={isMobile}
              theme={theme}
              closeModal={this.closePanel}
              editorState={getEditorState()}
              setEditorState={setEditorState}
              settings={settings}
              uiSettings={uiSettings}
              setKeepToolbarOpen={setKeepOpen}
              styleMapper={this.styleMapper}
              predicate={pluginParams.predicate}
              defaultColor={pluginParams.defaultColor}
              colorPickerHeaderKey={pluginParams.colorPickerHeaderKey}
            />
          </Modal>
        </InlineToolbarButton>
      );
    } else {
      return (
        <div className={styles.textColorPopup_button}>
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
          >
            {isPanelOpen && (
              <div className={styles.textColorPopup}>
                <ClickOutside onClickOutside={() => this.closePanel()}>
                  <TextColorPanel
                    t={t}
                    isMobile={isMobile}
                    theme={theme}
                    closeModal={this.closePanel}
                    editorState={getEditorState()}
                    setEditorState={setEditorState}
                    settings={settings}
                    uiSettings={uiSettings}
                    setKeepToolbarOpen={setKeepOpen}
                    styleMapper={this.styleMapper}
                    predicate={pluginParams.predicate}
                    defaultColor={pluginParams.defaultColor}
                    colorPickerHeaderKey={pluginParams.colorPickerHeaderKey}
                  />
                </ClickOutside>
              </div>
            )}
          </InlineToolbarButton>
        </div>
      );
    }
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
  toolbarName: PropTypes.string,
  uiSettings: PropTypes.object,
  config: PropTypes.object,
  setKeepOpen: PropTypes.func,
  pluginParams: PropTypes.object.isRequired,
  buttonRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.func })]),
};

BaseTextColor.defaultProps = {
  setKeepOpen: () => {},
};
