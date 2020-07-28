const getSelectedText = selection => selection.toString().replace(/(\r\n|\r|\n){2,}/g, ' ');

const getSelectionPosition = selection => {
  const parent = selection.anchorNode.parentNode;
  const parentRect = parent.getBoundingClientRect();
  const selectionRect = selection.getRangeAt(0).getBoundingClientRect();
  const parentTop = parent.offsetTop;
  const selectionOffesetFromParent = selectionRect.top - parentRect.top;
  const y = parentTop + selectionOffesetFromParent;
  const { x, width } = selectionRect;
  return { x: x + width / 2, y };
};

export default function addTextSelectionListener(container, callback) {
  const handleSelection = () => {
    const selection = document.getSelection();
    const selectionElement = selection.anchorNode?.parentElement;
    let selectedText = null;
    let position = {};
    if (
      selection.rangeCount > 0 &&
      (container.contains(selectionElement) || selectionElement === container)
    ) {
      selectedText = getSelectedText(selection);
      position = getSelectionPosition(selection);
    }
    callback(selectedText, position);
  };
  document.addEventListener('selectionchange', handleSelection);
  return () => document.removeEventListener('selectionchange', handleSelection);
}
