import PropTypes from 'prop-types';
import React from 'react';
import { TWITTER } from './toolbarOptions';

export default class TextSelectionListener extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedText: '' };
  }
  componentDidMount() {
    const { targetId } = this.props;
    const specifiedElement = document.getElementById(targetId);
    specifiedElement.addEventListener('mouseup', () => {
      this.getSelectionText();
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
    if (selectedText !== text) {
      const selectionRect = selection.getRangeAt(0).getBoundingClientRect();
      this.setState({ selectedText: text, selectionRect });
    } else {
      this.setState({ selectedText: '' });
    }
  };

  render() {
    const { ToolBar, targetId } = this.props;
    const { selectedText, selectionRect } = this.state;
    return selectedText !== '' ? (
      <ToolBar
        selectedText={selectedText}
        options={[TWITTER]}
        selectionRect={selectionRect}
        targetId={targetId}
      />
    ) : (
      <div />
    );
  }
}

TextSelectionListener.propTypes = {
  targetId: PropTypes.string.isRequired,
  ToolBar: PropTypes.any.isRequired,
};
