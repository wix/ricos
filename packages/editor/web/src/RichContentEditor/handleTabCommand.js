/* eslint-disable no-restricted-globals */
import {
  indentSelectedBlocks,
  insertString,
  deleteCharacterBeforeCursor,
  isTypeText,
  CHARACTERS,
  getCharacterBeforeSelection,
} from 'wix-rich-content-editor-common';
import { isListType, TABLE_TYPE } from 'ricos-content';

const isCodeBlock = blockType => blockType === 'code-block';

const getDirection = () => (!event.shiftKey ? 1 : -1);

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
  } else {
    newState = indentSelectedBlocks(editorState, getDirection());
  }
  return newState;
};

export default (editorState, blockType, customHandlers, command, innerRCERenderedIn) => {
  let newState;
  if (innerRCERenderedIn === TABLE_TYPE) {
    newState = customHandlers[command](editorState);
  } else if (isListType(blockType)) {
    newState = indentSelectedBlocks(editorState, getDirection());
  } else if (isTypeText(blockType)) {
    newState = handleTabOnText(editorState);
  } else if (!isCodeBlock(blockType)) {
    newState = customHandlers[command](editorState);
  }
  return newState;
};
