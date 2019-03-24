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
    };
    this.setColor = this.setColor.bind(this);
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

  render() {
    const { theme, settings, t } = this.props;
    const palette = settings.palette || DEFAULT_PALETTE;
    const userColors = settings.getUserColors() || [];
    return (
      <ColorPicker
        color={this.state.currentColor}
        palette={palette.slice(0, 6)}
        userColors={userColors.slice(0, 17)}
        onColorAdded={settings.onColorAdded}
        onChange={this.setColor}
        onClick={() => {}}
        theme={theme}
        scrollColorPickerDown={() => {}}
        t={t}
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
