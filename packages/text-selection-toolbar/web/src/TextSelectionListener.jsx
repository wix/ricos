import PropTypes from 'prop-types';
import React from 'react';
import { debounce } from 'lodash';

export default class TextSelectionListener extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedText: '' };
  }

  getSelectedText = selection => {
    let text = '';
    if (selection.rangeCount > 0) {
      text = selection.toString().replace(/(\r\n|\r|\n){2,}/g, ' ');
    }
    this.setState({ selectedText: text });
  };

  getSelectedPosition = selection => {
    if (selection.rangeCount > 0) {
      const parent = selection.anchorNode.parentNode;
      const parentRect = parent.getBoundingClientRect();
      const selectionRect = selection.getRangeAt(0).getBoundingClientRect();
      const parentTop = parent.offsetTop;
      const selectionTopInParent = selectionRect.top - parentRect.top;
      const top = parentTop + selectionTopInParent;
      const { x, width } = selectionRect;
      this.setState({
        position: {
          x,
          y: top,
          width,
        },
      });
    }
  };

  debounceSelection = debounce(() => {
    const selection = document.getSelection();
    this.getSelectedText(selection);
    this.getSelectedPosition(selection);
  }, 100);

  componentDidMount() {
    document.addEventListener('selectionchange', this.debounceSelection);
  }

  render() {
    const { ToolBar, viewerRect, children } = this.props;
    const { selectedText, position } = this.state;
    return selectedText !== '' ? (
      <ToolBar position={position} viewerRect={viewerRect}>
        {children(selectedText)}
      </ToolBar>
    ) : (
      <div />
    );
  }
}

TextSelectionListener.propTypes = {
  ToolBar: PropTypes.any.isRequired,
  children: PropTypes.any,
  viewerRect: PropTypes.object.isRequired,
};
