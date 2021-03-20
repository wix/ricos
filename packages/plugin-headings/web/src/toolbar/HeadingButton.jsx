import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import { HEADING_TYPE_TO_ELEMENT, DEFAULT_HEADERS_DROPDOWN_OPTIONS } from '../constants';
import { getCumulativeOffset } from 'wix-rich-content-plugin-commons';
import {
  decorateComponentWithProps,
  getModalStyles,
  InlineToolbarButton,
  EditorState,
  RichUtils,
} from 'wix-rich-content-editor-common';
import HeadingsDropDownPanel from './HeadingPanel';
import styles from '../../statics/styles/headingButtonStyles.scss';

export default class HeadingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPanel: false,
      currentHeading: 'P',
    };
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.buttonRef = React.createRef();
  }

  componentWillReceiveProps() {
    this.findCurrentHeading();
  }

  findCurrentHeading = () => {
    const currentEditorState = this.props.getEditorState();
    const selection = currentEditorState.getSelection();
    const headingType = currentEditorState
      .getCurrentContent()
      .blockMap.get(selection.anchorKey)
      .getType();
    const currentHeading = HEADING_TYPE_TO_ELEMENT[headingType] || 'P';
    this.setState({ currentHeading });
  };

  updateHeading = (type, element) => {
    const { setEditorState, getEditorState } = this.props;
    const newEditorState = RichUtils.toggleBlockType(getEditorState(), type);
    setEditorState(EditorState.forceSelection(newEditorState, this.selection));
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
    type
      ? this.updateHeading(type, element)
      : this.props.setEditorState(
          EditorState.forceSelection(this.currentEditorState, this.selection)
        );
  };

  static getModalParent() {
    return document.querySelector('.DraftEditor-root').parentNode;
  }

  // relies on helpers.openModal
  openMobilePanel(modalElement) {
    const modalStyles = getModalStyles({
      fullScreen: false,
      isMobile: true,
      customStyles: {
        content: {
          position: 'fixed',
          right: 0,
          left: 0,
          bottom: 0,
          padding: 0,
          borderRadius: 'unset',
          transform: 'translate3d(0,0,0)',
          margin: 0,
          width: '100%',
          top: 'auto',
          height: 362,
          boxShadow: 'unset',
        },
        overlay: {
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          zIndex: '40',
        },
      },
    });
    this.props.helpers.openModal?.({
      modalStyles,
      modalElement,
      isMobile: true,
    });
  }

  // relies on innerModal mechanism
  openDesktopPanel(modalElement) {
    const { innerModal, setKeepOpen } = this.props;
    setKeepOpen?.(true);
    const { bottom, left } = this.buttonRef.current.getBoundingClientRect();
    const position = { left: left - 15, top: bottom };
    const { offsetTop, offsetLeft } = getCumulativeOffset(innerModal.getContainer(), 0, 0);
    const modalProps = {
      top: position.top - offsetTop,
      left: position.left - offsetLeft,
      modalElement,
    };
    innerModal.openInnerModal(modalProps);
  }

  openPanel = () => {
    this.currentEditorState = this.oldEditorState = this.props.getEditorState();
    this.selection = this.oldEditorState.getSelection();
    const { theme, isMobile, customHeadings } = this.props;
    const { currentHeading } = this.state;
    const customHeadingsOptions = customHeadings || DEFAULT_HEADERS_DROPDOWN_OPTIONS;
    const modalElement = decorateComponentWithProps(HeadingsDropDownPanel, {
      customHeadingsOptions,
      isMobile,
      theme,
      heading: currentHeading,
      onSave: this.save,
      translateHeading: this.translateHeading,
      ...this.props,
    });
    if (isMobile) {
      this.openMobilePanel(modalElement);
    } else {
      this.openDesktopPanel(modalElement);
    }
  };

  closePanel = () => {
    const { helpers, isMobile, innerModal, setKeepOpen } = this.props;

    if (isMobile) {
      helpers.closeModal?.();
    } else {
      setKeepOpen?.(false);
      innerModal.closeInnerModal();
    }
  };

  render() {
    const { theme, isMobile, t, tabIndex } = this.props;
    const tooltipText = t('FormattingToolbar_TextStyleButton_Tooltip');
    const dataHookText = 'headingsDropdownButton';
    const { isPanelOpen, currentHeading } = this.state;
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
        ref={this.buttonRef}
      />
    );
  }
}

HeadingButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  helpers: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  tabIndex: PropTypes.number,
  setKeepOpen: PropTypes.func,
  customHeadings: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  innerModal: PropTypes.object.isRequired,
};

HeadingButton.defaultProps = {
  setKeepOpen: () => {},
};
