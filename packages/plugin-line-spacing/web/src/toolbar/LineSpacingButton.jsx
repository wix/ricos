import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { mergeStyles } from 'wix-rich-content-common';
import {
  getAnchorBlockData,
  InlineToolbarButton,
  mergeBlockData,
  EditorState,
} from 'wix-rich-content-editor-common';

import { LineSpacingIcon } from '../icons';
import Modal from 'react-modal';
import Panel from './LineSpacingPanel';
import classNames from 'classnames';
import styles from '../../statics/styles/styles.scss';

const lineHeight = 'line-height';
const spaceBefore = 'padding-top';
const spaceAfter = 'padding-bottom';

export default class LineSpacingButton extends Component {
  constructor(props) {
    super(props);
    this.state = { showPanel: false };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  static getBlockSpacing(editorState) {
    const { dynamicStyles = {} } = getAnchorBlockData(editorState);
    return pick(dynamicStyles, [lineHeight, spaceBefore, spaceAfter]);
  }

  openPanel = () => {
    this.currentEditorState = this.oldEditorState = this.props.getEditorState();
    this.selection = this.oldEditorState.getSelection();
    const spacing = LineSpacingButton.getBlockSpacing(this.oldEditorState);
    this.oldSpacing = spacing;
    const { bottom, left } = this.buttonRef.getBoundingClientRect();
    this.props.setKeepOpen(true);
    this.setState({ isPanelOpen: true, panelLeft: left, panelTop: bottom, spacing });
  };

  closePanel = () => {
    this.setState({ isPanelOpen: false });
    this.props.setKeepOpen(false);
  };

  updateSpacing = spacing => {
    const dynamicStyles = spacing;
    const { setEditorState, onUpdate } = this.props;
    const newEditorState = mergeBlockData(this.oldEditorState, { dynamicStyles });
    setEditorState(newEditorState);
    this.currentEditorState = newEditorState;
    onUpdate(dynamicStyles);
  };

  save = spacing => {
    this.closePanel();
    if (spacing) {
      this.updateSpacing(spacing);
    } else {
      this.setEditorState(this.currentEditorState);
    }
  };

  cancel = () => {
    const { onUpdate } = this.props;
    this.setEditorState(this.oldEditorState);
    onUpdate(this.oldSpacing);
    this.closePanel();
  };

  setEditorState = editorState =>
    this.props.setEditorState(this.fixSelection(editorState, this.selection));

  fixSelection = EditorState.forceSelection;

  static getModalParent() {
    return document.querySelector('.DraftEditor-root').parentNode;
  }

  render() {
    const { theme, isMobile, t, tabIndex, defaultSpacing, toolbar } = this.props;
    const { isPanelOpen, spacing, panelTop, panelLeft } = this.state;
    const { styles } = this;
    const icon = toolbar?.icons?.InsertPluginButtonIcon || LineSpacingIcon;
    const modalStyle = isMobile
      ? { left: 0, bottom: 0, right: 0 }
      : {
          top: panelTop,
          left: panelLeft,
        };

    return (
      <InlineToolbarButton
        onClick={this.openPanel}
        isActive={!!isPanelOpen}
        theme={theme}
        isMobile={isMobile}
        tooltipText={t('LineSpacingButton_Tooltip')}
        dataHook={'LineSpacingButton'}
        tabIndex={tabIndex}
        icon={icon}
        ref={ref => (this.buttonRef = ref)}
      >
        <Modal
          isOpen={isPanelOpen}
          onRequestClose={() => this.save()}
          className={classNames(styles.lineSpacingModal, {
            [styles.lineSpacingModal_mobile]: isMobile,
          })}
          overlayClassName={classNames(styles.lineSpacingModalOverlay, {
            [styles.lineSpacingModalOverlay_mobile]: isMobile,
          })}
          parentSelector={LineSpacingButton.getModalParent}
          style={{
            content: modalStyle,
          }}
          ariaHideApp={false}
        >
          <Panel
            spacing={{ ...defaultSpacing, ...spacing }}
            onChange={this.updateSpacing}
            onSave={this.save}
            onCancel={this.cancel}
            styles={this.styles}
            t={t}
            isMobile={isMobile}
            theme={theme}
          />
        </Modal>
      </InlineToolbarButton>
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
  toolbar: PropTypes.object,
};

LineSpacingButton.defaultProps = {
  setKeepOpen: () => {},
  onUpdate: () => {},
};
