import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ColorPicker } from 'wix-rich-content-common';

export default class TextColorPanel extends Component {
  componentDidMount() {
    const { getEditorState } = this.props;
    this.currentColor = this.getColorDataInSelection(getEditorState());
  }

  // TODO: get inline color styles from selection
  getColorDataInSelection = () => ({});

  createInlineColorStyle = () => {
    const { getEditorState, setEditorState } = this.props;
    const newEditorState = getEditorState();
    setEditorState(newEditorState);

    this.hideColorPanel();
  };

  render() {
    const { theme, settings } = this.props;
    return (
      <ColorPicker
        color={'#bada55'}
        settings={settings}
        onChange={() => {}}
        onClick={() => {}}
        theme={theme}
        isOpened={() => {}}
        index={0}
        scrollColorPickerDown={() => {}}
      />
    );
  }
}

TextColorPanel.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
  settings: PropTypes.object,
};
