import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modifier, EditorState } from '@wix/draft-js';
import { ColorPicker, getSelectionStyles } from 'wix-rich-content-common';
import { isHexColor } from '../utils';
import {
  DEFAULT_PALETTE,
  DEFAULT_COLOR,
  DEFAULT_SELECTION_COLOR,
  DEFAULT_COLOR_TO_STYLE,
} from './constants';

export default class TextColorPanel extends Component {
  constructor(props) {
    super(props);
    const currentColors = getSelectionStyles(style => isHexColor(style), props.editorState);
    this.state = {
      currentColor: currentColors.length > 0 ? currentColors[0] : DEFAULT_COLOR,
      userColors: props.settings.getUserColors() || [],
    };
    this.setColor = this.setColor.bind(this);
    this.onColorAdded = this.onColorAdded.bind(this);
  }

  componentWillUnmount() {
    this.props.setKeepToolbarOpen(false);
  }

  setColor(color) {
    const colorToStyle = this.props.settings.colorToStyle || DEFAULT_COLOR_TO_STYLE;
    if (color !== this.state.currentColor) {
      const style = colorToStyle(color);
      this.applyInlineColorStyle(style);
      this.setState({
        currentColor: style,
      });
    }
    this.props.helpers.closeModal();
  }

  applyInlineColorStyle(color) {
    const { editorState, setEditorState } = this.props;
    const currentColors = getSelectionStyles(style => isHexColor(style), editorState);
    const newEditorState = currentColors.reduce((nextEditorState, prevColor) => {
      const selection = nextEditorState.getSelection();
      const contentState = nextEditorState.getCurrentContent();
      const nextContentState = Modifier.removeInlineStyle(contentState, selection, prevColor);
      return EditorState.push(nextEditorState, nextContentState, 'change-inline-style');
    }, editorState);

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
    const palette = settings.getPaletteColors() || DEFAULT_PALETTE;
    return (
      <ColorPicker
        color={this.state.currentColor}
        selectionColor={settings.selectionColor || DEFAULT_SELECTION_COLOR}
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
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
  settings: PropTypes.shape({
    onColorAdded: PropTypes.func.isRequired,
    getPaletteColors: PropTypes.func.isRequired,
    getUserColors: PropTypes.func,
    selectionColor: PropTypes.string,
    getStyleSelectionPredicate: PropTypes.func,
    colorToStyle: PropTypes.func,
  }).isRequired,
  setKeepToolbarOpen: PropTypes.func,
  helpers: PropTypes.object.isRequired,
};
