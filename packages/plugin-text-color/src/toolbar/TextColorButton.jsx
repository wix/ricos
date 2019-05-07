import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from 'react-modal';
import { InlineToolbarButton, getSelectionStyles, mergeStyles } from 'wix-rich-content-common';
import TextColorIcon from './TextColorIcon';
import { TEXT_COLOR_TYPE } from '../types';
import TextColorPanel from './TextColorPanel';
import { PANEL_WIDTH, DEFAULT_STYLE_SELECTION_PREDICATE } from '../constants';
import styles from '../../statics/text-color.scss';

export default class TextColorButton extends Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  static getModalParent() {
    return document.querySelector('.DraftEditor-root').parentNode;
  }

  openPanel = () => {
    const { isMobile, setKeepOpen } = this.props;
    if (!isMobile) {
      setKeepOpen && setKeepOpen(true);
    }
    const { bottom, left } = this.buttonRef.getBoundingClientRect();
    const panelTop = bottom + 60;
    const panelLeft = left - PANEL_WIDTH / 2;
    this.setState({ isPanelOpen: true, panelLeft, panelTop });
  };

  closePanel = () => {
    this.setState({ isPanelOpen: false });
    this.props.setKeepOpen(false);
  };

  calculatePanelLocation = buttonRef => {
    if (this.props.isMobile) {
      return {};
    }
    if (!buttonRef) {
      return {};
    }
    const { bottom, left } = buttonRef.getBoundingClientRect();
    const panelTop = bottom + 60;
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
    } = this.props;
    const settings = config[TEXT_COLOR_TYPE];
    const { isPanelOpen, panelTop, panelLeft } = this.state;
    const tooltip = t('TextColorButton_Tooltip');
    const buttonStyles = {
      button: theme.inlineToolbarButton,
      buttonWrapper: theme.inlineToolbarButton_wrapper,
      icon: theme.inlineToolbarButton_icon,
      active: theme.inlineToolbarButton_active,
    };

    const modalStyle = {
      content: isMobile ? { left: 0, bottom: 0, right: 0 } : { top: panelTop, left: panelLeft },
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
      >
        <Modal
          isOpen={isPanelOpen}
          className={classNames(styles.textColorModal, {
            [styles.textColorModal_mobile]: isMobile,
          })}
          overlayClassName={classNames(styles.textColorModalOverlay, {
            [styles.textColorModalOverlay_mobile]: isMobile,
          })}
          parentSelector={TextColorButton.getModalParent}
          style={modalStyle}
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
