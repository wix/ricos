import { Component } from 'react';
import PropTypes from 'prop-types';

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
    // TODO: render ColorPicker (currentColor, theme, settings.colors, ..)
    return null;
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
