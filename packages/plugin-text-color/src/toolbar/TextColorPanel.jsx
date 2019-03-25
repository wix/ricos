import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modifier, EditorState } from '@wix/draft-js';
import { ColorPicker, getSelectionStyles } from 'wix-rich-content-common';
import { isHexColor } from '../utils';
import { DEFAULT_PALETTE, DEFAULT_COLOR } from './constants';

export default class TextColorPanel extends Component {
  constructor(props) {
    super(props);
    const defaultColor = props.settings.defaultColor || DEFAULT_COLOR;
    const currentColors = getSelectionStyles(style => isHexColor(style), props.getEditorState());
    this.state = {
      currentColor: currentColors.length > 0 ? currentColors[0] : defaultColor,
      userColors: props.settings.getUserColors() || [],
    };
    this.setColor = this.setColor.bind(this);
    this.onColorAdded = this.onColorAdded.bind(this);
  }

  componentWillUnmount() {
    this.props.setKeepToolbarOpen(false);
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

  onColorAdded(color) {
    this.props.settings.onColorAdded(color);
    this.setState({
      userColors: this.props.settings.getUserColors() || [],
    });
  }

  render() {
    const { theme, settings, t, setKeepToolbarOpen } = this.props;
    const palette = settings.palette || DEFAULT_PALETTE;
    return (
      <ColorPicker
        color={this.state.currentColor}
        palette={palette.slice(0, 6)}
        userColors={this.state.userColors.slice(0, 17)}
        onColorAdded={this.onColorAdded}
        onChange={this.setColor}
        theme={theme}
        t={t}
        setKeepToolbarOpen={setKeepToolbarOpen}
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
  settings: PropTypes.shape({
    onColorAdded: PropTypes.func.isRequired,
    palette: PropTypes.arrayOf(PropTypes.string),
    getUserColors: PropTypes.func,
    defaultColor: PropTypes.string,
  }).isRequired,
  setKeepToolbarOpen: PropTypes.func,
};
