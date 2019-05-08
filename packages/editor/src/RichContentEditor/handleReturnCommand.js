import { RichUtils, Modifier, EditorState } from '@wix/draft-js';
import isSoftNewlineEvent from '@wix/draft-js/lib/isSoftNewlineEvent';
import { getAnchorBlockData } from 'wix-rich-content-common';

export default updateEditorState => (command, editorState) => {
  if (isSoftNewlineEvent(command)) {
    const newState = RichUtils.insertSoftNewline(editorState);
    updateEditorState(newState);
    return 'handled';
  }

  const { dynamicStyles } = getAnchorBlockData(editorState);
  if (dynamicStyles) {
    const newState = splitState(editorState, dynamicStyles);
    updateEditorState(newState);
    return 'handled';
  }
  return 'not-handled';
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
  return EditorState.push(editorState, contentStateWithStyles, 'split-block');
};
