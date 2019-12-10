import PropTypes from 'prop-types';
import React from 'react';
import { TWITTER } from './toolbarOptions';

export default class SelectedText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedText: '' };
  }
  componentDidMount() {
    const { id } = this.props;
    const specifiedElement = document.getElementById(id);
    specifiedElement.addEventListener('mouseup', e => {
      !e.target.id.includes('viewer-toolbar') && this.getSelectionText();
    });
    document.addEventListener('click', e => {
      if (!specifiedElement.contains(e.target)) {
        this.setState({ selectedText: '' });
      }
    });
  }

  getSelectionText = () => {
    let text = '';
    const { selectedText } = this.state;
    let selection;
    if (window.getSelection) {
      selection = window.getSelection();
      text = selection.toString();
    }
    // else if (document.selection && document.selection.type !== 'Control') {
    //   text = document.selection.createRange().text;
    // }
    if (selectedText !== text) {
      const selectionRect = selection.getRangeAt(0).getBoundingClientRect();
      this.setState({ selectedText: text, selectionRect });
    } else {
      this.setState({ selectedText: '' });
    }
  };

  render() {
    const { ToolBar } = this.props;
    const { selectedText, selectionRect } = this.state;
    return selectedText !== '' ? (
      <ToolBar
        selectedText={selectedText}
        id="viewer-toolbar"
        options={[TWITTER]}
        selectionRect={selectionRect}
      />
    ) : (
      <div />
    );
  }
}

SelectedText.propTypes = {
  id: PropTypes.string.isRequired,
  ToolBar: PropTypes.any.isRequired,
};
