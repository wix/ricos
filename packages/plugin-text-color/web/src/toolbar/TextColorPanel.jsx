import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modifier, EditorState } from 'draft-js';
import { ColorPicker, getSelectionStyles } from 'wix-rich-content-common';
import { DEFAULT_COLOR, DEFAULT_STYLE_SELECTION_PREDICATE } from '../constants';

import {
  extractColor,
  extractPalette,
  extractSchemeAttributes,
  validateColorScheme,
} from '../color-scheme-utils';

export default class TextColorPanel extends Component {
  constructor(props) {
    super(props);
    const styleSelectionPredicate =
      props.settings.styleSelectionPredicate || DEFAULT_STYLE_SELECTION_PREDICATE;
    if (props.settings.colorScheme && !validateColorScheme(props.settings.colorScheme)) {
      console.error('Error: colorScheme is not valid'); // eslint-disable-line no-console
    }
    const currentColors = getSelectionStyles(styleSelectionPredicate, props.editorState);
    this.state = {
      currentColor:
        currentColors.length > 0
          ? extractColor(props.settings.colorScheme, currentColors[0])
          : DEFAULT_COLOR,
      currentSchemeColor: currentColors[0],
      userColors: props.settings.getUserColors() || [],
    };
    this.setColor = this.setColor.bind(this);
    this.onColorAdded = this.onColorAdded.bind(this);
  }

  componentWillUnmount() {
    this.props.setKeepToolbarOpen(false);
  }

  setColor(color) {
    let { editorState } = this.props;
    if (color !== this.state.currentColor) {
      editorState = this.getInlineColorState(color);
      this.setState({
        currentColor: extractColor(this.props.settings.colorScheme, color),
        currentSchemeColor: color,
      });
    }
    this.props.closeModal(editorState);
  }

  getInlineColorState(color) {
    const { editorState, settings } = this.props;
    const styleSelectionPredicate =
      settings.styleSelectionPredicate || DEFAULT_STYLE_SELECTION_PREDICATE;
    const selection = editorState.getSelection();
    const currentColors = getSelectionStyles(styleSelectionPredicate, editorState);
    const newEditorState = currentColors.reduce((nextEditorState, prevColor) => {
      const contentState = nextEditorState.getCurrentContent();
      const nextContentState = Modifier.removeInlineStyle(contentState, selection, prevColor);
      return EditorState.push(nextEditorState, nextContentState, 'change-inline-style');
    }, editorState);
    const contentState = newEditorState.getCurrentContent();
    const newContentState = Modifier.applyInlineStyle(contentState, selection, color);
    return EditorState.push(newEditorState, newContentState, 'change-inline-style');
  }

  onColorAdded(color) {
    this.props.settings.onColorAdded(color);
    this.setState({
      userColors: this.props.settings.getUserColors() || [],
    });
  }

  render() {
    const { theme, settings, t, setKeepToolbarOpen, isMobile } = this.props;
    const { colorScheme } = settings;
    const palette = extractPalette(colorScheme);
    const schemeAttributes = extractSchemeAttributes(colorScheme);
    const { onCustomPickerToggle, onCustomColorPicked } = settings;
    return (
      <ColorPicker
        schemeAttributes={schemeAttributes}
        schemeColor={this.state.currentSchemeColor}
        color={this.state.currentColor}
        palette={palette.slice(0, 6)}
        userColors={this.state.userColors.slice(0, 17)}
        onColorAdded={this.onColorAdded}
        onChange={this.setColor}
        onCustomPickerToggle={onCustomPickerToggle}
        onCustomColorPicked={onCustomColorPicked}
        theme={theme}
        t={t}
        setKeepToolbarOpen={setKeepToolbarOpen}
        isMobile={isMobile}
      >
        {({ renderPalette, renderUserColors, renderAddColorButton, mergedStyles }) => (
          <div className={mergedStyles.colorPicker_palette}>
            <div className={mergedStyles.colorPicker_buttons_container}>{renderPalette()}</div>
            <hr className={mergedStyles.colorPicker_separator} />
            <div className={mergedStyles.colorPicker_buttons_container}>
              {renderUserColors()}
              {renderAddColorButton()}
            </div>
          </div>
        )}
      </ColorPicker>
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
    colorScheme: PropTypes.object,
    getUserColors: PropTypes.func,
    onCustomPickerToggle: PropTypes.func,
    onCustomColorPicked: PropTypes.func,
    styleSelectionPredicate: PropTypes.func,
  }).isRequired,
  setKeepToolbarOpen: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};
