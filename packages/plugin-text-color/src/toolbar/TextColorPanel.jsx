import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ColorPicker } from 'wix-rich-content-common';

export default class TextLinkPanel extends Component {
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

  hideColorPanel = () => {
    // TODO: close modal
  };

  render() {
    const { theme } = this.props;
    return (
      <ColorPicker
        color={'#bada55'}
        settings={{
          colors: {
            color_1: '#FEFDFD',
            color_2: '#D5D4D4',
            color_3: '#000000',
            color_4: '#000000',
            color_5: '#000000',
            color_6: '#ABCAFF',
            color_7: '#81B0FF',
            color_8: '#0261FF',
            color_9: '#0141AA',
            color_10: '#012055',
          },
        }}
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

TextLinkPanel.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
};
