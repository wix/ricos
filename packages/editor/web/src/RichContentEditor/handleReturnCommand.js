import {
  getAnchorBlockData,
  RichUtils,
  Modifier,
  EditorState,
  KeyBindingUtil,
} from 'wix-rich-content-editor-common';

const HANDLED = 'handled';
const NOT_HANDLED = 'not-handled';
const SPLIT_BLOCK = 'split-block';

export default updateEditorState => (command, editorState) => {
  if (KeyBindingUtil.isSoftNewlineEvent(command)) {
    const newState = RichUtils.insertSoftNewline(editorState);
    updateEditorState(newState);
    return HANDLED;
  }

  const { dynamicStyles } = getAnchorBlockData(editorState);
  if (dynamicStyles) {
    const newState = splitState(editorState, dynamicStyles);
    updateEditorState(newState);
    return HANDLED;
  }
  return NOT_HANDLED;
};

const splitState = (editorState, styles) => {
  const splitContentState = Modifier.splitBlock(
    editorState.getCurrentContent(),
    editorState.getSelection()
  );
  const contentStateWithStyles = Modifier.mergeBlockData(
    splitContentState,
    splitContentState.getSelectionAfter(),
    { dynamicStyles: styles }
  );
  return EditorState.push(editorState, contentStateWithStyles, SPLIT_BLOCK);
};
