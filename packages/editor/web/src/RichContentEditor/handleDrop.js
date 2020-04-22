export default handleDrop => (
  selection,
  dataTransfer,
  isInternal,
  { getEditorState, setEditorState }
) => {
  const editorState = getEditorState();
  const contentState = editorState.getCurrentContent();
  const firstKey = contentState.getFirstBlock().key;

  if (selection.anchorKey === firstKey && selection.anchorOffset === 0) {
    return undefined;
  }

  return handleDrop(selection, dataTransfer, isInternal, { getEditorState, setEditorState });
};
