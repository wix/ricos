import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modifier, EditorState } from '@wix/draft-js';
import { ColorPicker, getSelectionStyles } from 'wix-rich-content-common';
import { isHexColor } from '../utils';
import { DEFAULT_PALETTE } from './constants';

export default class TextColorPanel extends Component {
  constructor(props) {
    super(props);
    const currentColors = getSelectionStyles(style => isHexColor(style), props.getEditorState());
    this.state = {
      currentColor: currentColors.length > 0 ? currentColors[0] : props.defaultColor,
    };
    this.setColor = this.setColor.bind(this);
  }

  setColor(color) {
    this.applyInlineColorStyle(color);
    this.setState({
      currentColor: color,
    });
  }

  applyInlineColorStyle(color) {
    const { getEditorState, setEditorState } = this.props;
    const currentColors = getSelectionStyles(style => isHexColor(style), getEditorState());
    const newEditorState = currentColors.reduce((nextEditorState, prevColor) => {
      const selection = nextEditorState.getSelection();
      const contentState = nextEditorState.getCurrentContent();
      const nextContentState = Modifier.removeInlineStyle(contentState, selection, prevColor);
      return EditorState.push(nextEditorState, nextContentState, 'change-inline-style');
    }, getEditorState());

    const selection = newEditorState.getSelection();
    const contentState = newEditorState.getCurrentContent();
    const newContentState = Modifier.applyInlineStyle(contentState, selection, color);
    setEditorState(EditorState.push(newEditorState, newContentState, 'change-inline-style'));
  }

  render() {
    const { theme, settings, t } = this.props;
    const palette = settings.palette || DEFAULT_PALETTE;
    const userColors = settings.userColors || [];
    return (
      <ColorPicker
        color={this.state.currentColor}
        palette={palette}
        userColors={userColors}
        onChange={this.setColor}
        onClick={() => {}}
        theme={theme}
        isOpened
        index={0}
        scrollColorPickerDown={() => {}}
        t={t}
        label={''}
      />
    );
  }
}

TextColorPanel.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
  settings: PropTypes.object,
  defaultColor: PropTypes.string,
};

TextColorPanel.defaultProps = {
  defaultColor: '#000000',
};
