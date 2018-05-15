import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from '@wix/draft-js';
import { Separator, getTextAlignment } from 'wix-rich-content-common';
import TextButton from './TextButton';
import {
  AlignTextLeftButton,
  AlignTextCenterButton,
  AlignTextRightButton,
  AlignTextJustifyButton
} from './index';
import BackArrowIcon from '../icons/back-arrow.svg';
import styles from 'wix-rich-content-common/dist/Styles/global.scss';

export default class AlignmentPanel extends Component {
  constructor(props) {
    super(props);
    this.alignmentButtons = [
      AlignTextLeftButton,
      AlignTextCenterButton,
      AlignTextRightButton,
      AlignTextJustifyButton
    ];
  }

  componentDidMount() {
    setTimeout(() => {
      window.addEventListener('click', this.onWindowClick);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () => this.closePanel();

  handleBackClick = () => this.closePanel();

  closePanel() {
    this.props.onOverrideContent(undefined);
  }

  onAlignmentChange = textAlignment => {
    const editorState = this.props.getEditorState();
    const contentState = Modifier.mergeBlockData(editorState.getCurrentContent(), editorState.getSelection(), { textAlignment });
    const newEditorState = EditorState.push(editorState, contentState, 'change-block-data');
    this.props.setEditorState(newEditorState);
  };

  render() {
    const alignment = getTextAlignment(this.props.getEditorState());
    const buttonProps = {
      alignment,
      onClick: this.onAlignmentChange,
      tabIndex: this.props.tabIndex,
      ...this.props
    };
    return (
      <div className={styles.flex}>
        <TextButton
          tabIndex={this.props.tabIndex} icon={BackArrowIcon} dataHook="textBackArrow"
          onClick={this.handleBackClick} theme={this.props.theme}
        />
        <Separator className={this.props.theme.inlineToolbarSeparator}/>
        {this.alignmentButtons.map((Button, i) => <Button key={i} {...buttonProps} />)}
      </div>
    );
  }
}

AlignmentPanel.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  tabIndex: PropTypes.number,
};
