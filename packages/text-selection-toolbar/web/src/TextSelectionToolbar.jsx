import PropTypes from 'prop-types';
import React from 'react';
import { debounce } from 'lodash';

export default class TextSelectionToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedText: '' };
  }

  getSelectedText = selection => selection.toString().replace(/(\r\n|\r|\n){2,}/g, ' ');

  getSelectionPosition = selection => {
    const parent = selection.anchorNode.parentNode;
    const parentRect = parent.getBoundingClientRect();
    const selectionRect = selection.getRangeAt(0).getBoundingClientRect();
    const parentTop = parent.offsetTop;
    const selectionOffesetFromParent = selectionRect.top - parentRect.top;
    const y = parentTop + selectionOffesetFromParent;
    const { x, width } = selectionRect;
    return { x: x + width / 2, y };
  };

  debounceSelection = debounce(() => {
    const selection = document.getSelection();
    let text = null;
    let position = null;
    if (selection.rangeCount > 0) {
      text = this.getSelectedText(selection);
      position = this.getSelectionPosition(selection);
    }
    this.setState({ selectedText: text, position });
  }, 100);

  componentDidMount() {
    document.addEventListener('selectionchange', this.debounceSelection);
  }

  componentWillUnmount() {
    window.removeEventListener('selectionchange', this.debounceSelection, false);
  }

  render() {
    const { ToolBar, viewerRect, children } = this.props;
    const { selectedText, position } = this.state;
    return (
      selectedText && (
        <ToolBar position={position} viewerRect={viewerRect}>
          {children(selectedText)}
        </ToolBar>
      )
    );
  }
}

TextSelectionToolbar.propTypes = {
  ToolBar: PropTypes.any.isRequired,
  children: PropTypes.any,
  viewerRect: PropTypes.object.isRequired,
};
