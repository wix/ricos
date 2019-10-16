import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from 'react-modal';
import { EditorState } from '@wix/draft-js';
import { InlineToolbarButton, getSelectionStyles, mergeStyles } from 'wix-rich-content-common';
import TextColorPanel from './TextColorPanel';
import { PANEL_WIDTH, DEFAULT_STYLE_SELECTION_PREDICATE } from '../constants';
import styles from '../../statics/styles/text-color-modal.scss';

export default class TextColorWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { showPanel: false };
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.buttonRef = this.props.buttonRef;
  }

  static getModalParent() {
    return document.querySelector('.DraftEditor-root').parentNode;
  }

  openPanel = () => {
    const { isMobile, setKeepOpen } = this.props;
    if (!isMobile) {
      setKeepOpen && setKeepOpen(true);
    }
    const { bottom, left } = this.buttonRef.current.getBoundingClientRect();
    const panelLeft = left - PANEL_WIDTH / 2;
    this.setState({ isPanelOpen: true, panelLeft, panelTop: bottom });
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
    const settings = this.props.config[this.props.type.TYPE] || {};
    const styleSelectionPredicate =
      settings.styleSelectionPredicate || DEFAULT_STYLE_SELECTION_PREDICATE;
    return getSelectionStyles(styleSelectionPredicate, this.props.getEditorState()).length > 0;
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
      type,
    } = this.props;
    const settings = config[type.TYPE];
    const { isPanelOpen, panelTop, panelLeft } = this.state;
    const tooltip = t(type.toolTip);
    const buttonStyles = {
      button: theme.inlineToolbarButton,
      buttonWrapper: theme.inlineToolbarButton_wrapper,
      icon: theme.inlineToolbarButton_icon,
      active: theme.inlineToolbarButton_active,
    };

    const modalStyle = {
      content: isMobile ? { top: 'unset', left: 0 } : { top: panelTop, left: panelLeft },
    };

    return (
      <InlineToolbarButton
        onClick={this.openPanel}
        isActive={this.isActive}
        theme={{ ...theme, ...buttonStyles }}
        isMobile={isMobile}
        tooltipText={tooltip}
        dataHook={type.dataHook}
        tabIndex={tabIndex}
        icon={type.icon}
        forwardRef={this.buttonRef}
      >
        <Modal
          onRequestClose={() => this.closePanel()}
          isOpen={isPanelOpen}
          parentSelector={TextColorWrapper.getModalParent}
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
          />
        </Modal>
      </InlineToolbarButton>
    );
  }
}

TextColorWrapper.propTypes = {
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
  type: PropTypes.object.isRequired,
  buttonRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.func })]),
};

TextColorWrapper.defaultProps = {
  setKeepOpen: () => {},
};
