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

  handleSelection = debounce(() => {
    const { container } = this.props;
    const selection = document.getSelection();
    const selectionElement = selection.anchorNode?.parentElement;
    let text = null;
    let position = null;
    if (
      selection.rangeCount > 0 &&
      (container.contains(selectionElement) || selectionElement === container)
    ) {
      text = this.getSelectedText(selection);
      position = this.getSelectionPosition(selection);
    }
    this.setState({ selectedText: text, position });
  }, 100);

  componentDidMount() {
    document.addEventListener('selectionchange', this.handleSelection);
  }

  componentWillUnmount() {
    document.removeEventListener('selectionchange', this.handleSelection, false);
  }

  render() {
    const { ToolBar, container, children } = this.props;
    const { selectedText, position } = this.state;
    return (
      selectedText && (
        <ToolBar position={position} container={container}>
          {children(selectedText)}
        </ToolBar>
      )
    );
  }
}

TextSelectionToolbar.propTypes = {
  ToolBar: PropTypes.any.isRequired,
  children: PropTypes.any,
  container: PropTypes.object.isRequired,
};
