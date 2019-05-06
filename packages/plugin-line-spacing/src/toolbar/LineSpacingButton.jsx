import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import {
  getAnchorBlockData,
  getModalStyles,
  InlineToolbarButton,
  mergeBlockData,
  mergeStyles,
} from 'wix-rich-content-common';
import { EditorState } from '@wix/draft-js';

import { LineSpacingIcon } from '../icons';
import styles from '../../statics/styles/styles.scss';
import { MODAL_STYLES } from './modalStyles';
import { Modals } from '../modals';

const lineHeight = 'line-height';
const spaceBefore = 'padding-top';
const spaceAfter = 'padding-bottom';

export default class LineSpacingButton extends Component {
  constructor(props) {
    super(props);
    this.state = { showPanel: false };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  getBlockSpacing(editorState) {
    const { dynamicStyles = {} } = getAnchorBlockData(editorState);
    return pick(dynamicStyles, [lineHeight, spaceBefore, spaceAfter]);
  }

  openPanel = () => {
    const { setKeepOpen, isMobile, helpers, t, defaultSpacing, keyName } = this.props;
    if (helpers && helpers.openModal) {
      const editorState = this.props.getEditorState();
      this.oldEditorState = EditorState.forceSelection(
        //fixes 'undo' bug, due to the lost selection
        editorState,
        editorState.getSelection()
      );
      this.currentEditorState = this.oldEditorState;
      setKeepOpen(true);

      this.oldSpacing = this.getBlockSpacing(this.oldEditorState);
      this.setState({ isPanelOpen: true });

      const modalProps = {
        spacing: { ...defaultSpacing, ...this.oldSpacing },
        onChange: this.updateSpacing,
        onSave: this.save,
        onCancel: this.cancel,
        styles: this.styles,
        helpers,
        modalStyles: this.getModalStyles(isMobile),
        isMobile,
        t,
        modalName: Modals.LINE_SPACING,
        onRequestClose: () => this.save(),
      };
      helpers.openModal(modalProps);
    } else {
      // eslint-disable-next-line no-console
      console.error(
        'helpers.openModal function is not defined for toolbar button with keyName ' + keyName
      );
    }
  };

  getModalStyles(isMobile) {
    const styles = isMobile ? MODAL_STYLES.mobile : MODAL_STYLES.desktop;
    const { bottom, left } = this.buttonRef.getBoundingClientRect();
    const modalPosition = isMobile
      ? { left: 0, bottom: 0, right: 0 }
      : {
          top: bottom,
          left,
        };

    return getModalStyles({
      fullScreen: false,
      customStyles: {
        content: { ...styles.content, ...modalPosition },
        overlay: styles.overlay,
      },
    });
  }

  updateSpacing = spacing => {
    const dynamicStyles = spacing;
    const { setEditorState, onUpdate } = this.props;
    const newEditorState = mergeBlockData(this.oldEditorState, { dynamicStyles });
    setEditorState(newEditorState);
    this.currentEditorState = newEditorState;
    onUpdate(dynamicStyles);
  };

  closePanel = () => {
    this.setState({ isPanelOpen: false });
    this.props.helpers.closeModal();
    this.props.setKeepOpen(false);
  };

  save = spacing => {
    this.closePanel();
    if (spacing) {
      this.updateSpacing(spacing);
    } else {
      this.props.setEditorState(this.currentEditorState); // fix selection (selection is lost due to focus)
    }
  };

  cancel = () => {
    const { setEditorState, onUpdate } = this.props;
    setEditorState(this.oldEditorState);
    onUpdate(this.oldSpacing);
    this.closePanel();
  };

  render() {
    const { theme, isMobile, t, tabIndex } = this.props;
    const { isPanelOpen } = this.state;

    return (
      <InlineToolbarButton
        onClick={this.openPanel}
        isActive={isPanelOpen}
        theme={theme}
        isMobile={isMobile}
        tooltipText={t('LineSpacingButton_Tooltip')}
        tabIndex={tabIndex}
        icon={LineSpacingIcon}
        ref={ref => (this.buttonRef = ref)}
      />
    );
  }
}

LineSpacingButton.propTypes = {
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
  onUpdate: PropTypes.func,
  defaultSpacing: PropTypes.object,
  settings: PropTypes.object,
  keyName: PropTypes.string,
};

LineSpacingButton.defaultProps = {
  setKeepOpen: () => {},
  onUpdate: () => {},
};
