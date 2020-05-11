/* eslint-disable no-restricted-globals */
import {
  indentSelectedBlocks,
  insertString,
  deleteTabCharacter,
  isTypeText,
  CHARACTERS,
  getCharacterBeforeSelection,
} from 'wix-rich-content-editor-common';

const isList = blockType =>
  blockType === 'ordered-list-item' || blockType === 'unordered-list-item';
const isCodeBlock = blockType => blockType === 'code-block';
const getAdjustment = () => (!event.shiftKey ? 1 : -1);

export default function handleTabCommand(editorState, blockType, customHandlers, command) {
  let newState;
  if (isList(blockType)) {
    const direction = !event.shiftKey ? 1 : -1;
    newState = indentSelectedBlocks(editorState, direction);
  } else if (isTypeText(blockType)) {
    const selectionState = editorState.getSelection();
    if (selectionState.isCollapsed()) {
      if (!event.shiftKey) {
        newState = insertString(editorState, CHARACTERS.TAB);
      } else {
        const character = getCharacterBeforeSelection(editorState);
        if (character === '\t') {
          newState = deleteTabCharacter(editorState);
        }
      }
    } else {
      newState = indentSelectedBlocks(editorState, getAdjustment());
    }
  } else if (!isCodeBlock(blockType)) {
    newState = customHandlers[command](editorState);
  }
  return newState;
}
