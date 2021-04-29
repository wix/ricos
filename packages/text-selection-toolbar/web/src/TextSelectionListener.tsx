const getSelectedText = selection => selection.toString().replace(/(\r\n|\r|\n){2,}/g, ' ');

const getInnerSelectionNodes = range => {
  const _iterator = document.createNodeIterator(range.commonAncestorContainer, NodeFilter.SHOW_ALL);
  const innerSelectionNodes: Node[] = [];
  // eslint-disable-next-line fp/no-loops,no-empty
  while (_iterator.nextNode() && _iterator.referenceNode !== range.startContainer) {}
  // eslint-disable-next-line fp/no-loops
  while (_iterator.nextNode() && _iterator.referenceNode !== range.endContainer) {
    if (_iterator.referenceNode.nodeType === Node.TEXT_NODE) {
      innerSelectionNodes.push(_iterator.referenceNode);
    }
  }
  return innerSelectionNodes;
};

const getSelectionRects = selection => {
  const range = selection.getRangeAt(0);

  const innerSelectionNodes = getInnerSelectionNodes(range);
  const innerRects = innerSelectionNodes.map(n => {
    const r = document.createRange();
    r.selectNodeContents(n);
    return r.getBoundingClientRect();
  });
  const clientRects = range.getClientRects();

  return [clientRects[0], ...innerRects, clientRects[clientRects.length - 1]];
};

const getSelectionPosition = selection => {
  const rects = getSelectionRects(selection);

  let left = 999999;
  let right = 0;
  rects.forEach(rect => {
    left = Math.min(left, rect.left);
    right = Math.max(right, rect.right);
  });
  const y = rects[0].top + window.scrollY;
  const x = (left + right) / 2 + window.scrollX;
  return { x, y };
};

export default function addTextSelectionListener(container, callback) {
  const handleSelection = () => {
    const selection = document.getSelection();
    const selectionAnchor = selection?.anchorNode;
    const selectionFocus = selection?.focusNode;
    let selectedText, position;
    if (
      selection &&
      selection.rangeCount > 0 &&
      !selection.isCollapsed &&
      container.contains(selectionAnchor) &&
      container.contains(selectionFocus)
    ) {
      selectedText = getSelectedText(selection);
      position = getSelectionPosition(selection);
    }
    callback(selectedText, position);
  };
  document.addEventListener('selectionchange', handleSelection);
  return () => document.removeEventListener('selectionchange', handleSelection);
}
