/* eslint-disable no-restricted-globals */
import {
  insertString,
  deleteCharacterBeforeCursor,
  isTypeText,
  CHARACTERS,
  getCharacterBeforeSelection,
} from 'wix-rich-content-editor-common';

const isCodeBlock = blockType => blockType === 'code-block';

const handleTabOnText = editorState => {
  let newState;
  const selectionState = editorState.getSelection();

  if (selectionState.isCollapsed()) {
    if (!event.shiftKey) {
      newState = insertString(editorState, CHARACTERS.TAB);
    } else {
      const character = getCharacterBeforeSelection(editorState);
      if (character === '\t') {
        newState = deleteCharacterBeforeCursor(editorState);
      }
    }
  }
  return newState;
};

export default (editorState, blockType, customHandlers, command) => {
  let newState;
  if (isTypeText(blockType)) {
    newState = handleTabOnText(editorState);
  } else if (!isCodeBlock(blockType)) {
    newState = customHandlers[command](editorState);
  }
  return newState;
};
