import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import {
  InlineToolbarButton,
  EditorState,
  DEFAULT_HEADERS_DROPDOWN_OPTIONS,
  RichUtils,
} from 'wix-rich-content-editor-common';
import Modal from 'react-modal';
import HeadingsDropDownPanel from './HeadingPanel';
import classNames from 'classnames';
import styles from '../../statics/styles/headingButtonStyles.scss';

export default class HeadingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPanel: false,
      currentHeading: 'P',
    };
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.HEADING_TYPE_TO_ELEMENT = {
      'header-two': 'H2',
      'header-three': 'H3',
      'header-four': 'H4',
      'header-five': 'H5',
      'header-six': 'H6',
      unstyled: 'P',
    };
  }

  componentWillReceiveProps() {
    this.findCurrentHeading();
  }

  findCurrentHeading = () => {
    const currentEditorState = this.props.getEditorState();
    const selection = currentEditorState.getSelection();
    const headingType = currentEditorState
      .getCurrentContent()
      .blockMap.get(selection.focusKey)
      .getType();
    const currentHeading = this.HEADING_TYPE_TO_ELEMENT[headingType] || 'P';
    this.setState({ currentHeading });
  };

  openPanel = () => {
    this.currentEditorState = this.oldEditorState = this.props.getEditorState();
    this.selection = this.oldEditorState.getSelection();
    const { bottom, left } = this.buttonRef.getBoundingClientRect();
    this.props.setKeepOpen(true);
    this.setState({ isPanelOpen: true, panelLeft: left - 15, panelTop: bottom });
  };

  closePanel = () => {
    this.setState({ isPanelOpen: false });
    this.props.setKeepOpen(false);
  };

  updateHeading = (type, element) => {
    const { setEditorState, getEditorState } = this.props;
    const newEditorState = RichUtils.toggleBlockType(getEditorState(), type);
    setEditorState(this.fixSelection(newEditorState, this.selection));
    this.currentEditorState = newEditorState;
    this.setState({ currentHeading: element });
  };

  translateHeading = (option = '') => {
    const { t } = this.props;
    return option.length === 1
      ? t('FormattingToolbar_TextStyle_Paragraph')
      : t('FormattingToolbar_TextStyle_Heading', { number: option.slice(-1) });
  };

  fixEllipsis = (text = '') => {
    if (text.length > 10) {
      const number = text.slice(-1);
      if (typeof number === 'number') {
        return text.slice(0, 5) + '...' + number;
      } else {
        return text.slice(0, 6) + '...';
      }
    }
    return text;
  };

  save = (type, element) => {
    this.closePanel();
    type ? this.updateHeading(type, element) : this.setEditorState(this.currentEditorState);
  };

  setEditorState = editorState =>
    this.props.setEditorState(this.fixSelection(editorState, this.selection));

  fixSelection = EditorState.forceSelection;

  static getModalParent() {
    return document.querySelector('.DraftEditor-root').parentNode;
  }

  render() {
    const { theme, isMobile, t, tabIndex, customHeadings } = this.props;
    const tooltipText = t('FormattingToolbar_TextStyleButton_Tooltip');
    const dataHookText = 'headingsDropdownButton';
    const { isPanelOpen, panelTop, panelLeft, currentHeading } = this.state;
    const { styles } = this;
    const customHeadingsOptions = customHeadings || DEFAULT_HEADERS_DROPDOWN_OPTIONS;
    const modalStyle = isMobile
      ? { left: 0, bottom: 0, right: 0 }
      : {
          top: panelTop,
          left: panelLeft,
        };
    const buttonContent = this.fixEllipsis(this.translateHeading(currentHeading));
    return (
      <InlineToolbarButton
        onClick={this.openPanel}
        isActive={isPanelOpen}
        theme={theme}
        isMobile={isMobile}
        tooltipText={tooltipText}
        dataHook={dataHookText}
        tabIndex={tabIndex}
        buttonContent={buttonContent}
        showArrowIcon
        ref={ref => (this.buttonRef = ref)}
      >
        <Modal
          isOpen={isPanelOpen}
          onRequestClose={() => this.save()}
          className={classNames(styles.headingsModal, {
            [styles.headingsModal_mobile]: isMobile,
          })}
          overlayClassName={classNames(styles.headingsModalOverlay, {
            [styles.headingsModalOverlay_mobile]: isMobile,
          })}
          parentSelector={HeadingButton.getModalParent}
          style={{
            content: modalStyle,
          }}
          ariaHideApp={false}
        >
          <HeadingsDropDownPanel
            customHeadingsOptions={customHeadingsOptions}
            heading={currentHeading}
            onSave={this.save}
            styles={this.styles}
            isMobile={isMobile}
            theme={theme}
            translateHeading={this.translateHeading}
            {...this.props}
          />
        </Modal>
      </InlineToolbarButton>
    );
  }
}

HeadingButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  helpers: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  tabIndex: PropTypes.number,
  setKeepOpen: PropTypes.func,
  settings: PropTypes.object,
  customHeadings: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

HeadingButton.defaultProps = {
  setKeepOpen: () => {},
};
