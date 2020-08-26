/* eslint-disable no-restricted-globals */
import { COMMANDS, mergeBlockData, RichUtils } from 'wix-rich-content-editor-common';
import handleBackspaceCommand from './handleBackspaceCommand';
import handleDeleteCommand from './handleDeleteCommand';
import handleTabCommand from './handleTabCommand';

const isTab = command => command === COMMANDS.TAB || command === COMMANDS.SHIFT_TAB;

export default (updateEditorState, customHandlers, blockType, props) => (command, editorState) => {
  let newState;

  if (customHandlers[command]) {
    if (isTab(command)) {
      newState = handleTabCommand(editorState, blockType, customHandlers, command);
    } else {
      newState = customHandlers[command](editorState, event);
    }
  } else {
    switch (command) {
      case COMMANDS.ALIGN_RIGHT:
      case COMMANDS.ALIGN_LEFT:
      case COMMANDS.ALIGN_CENTER:
      case COMMANDS.JUSTIFY:
        newState = mergeBlockData(editorState, { textAlignment: command });
        break;
      case COMMANDS.TITLE:
      case COMMANDS.SUBTITLE:
      case COMMANDS.NUMBERED_LIST:
      case COMMANDS.BULLET_LIST:
      case COMMANDS.BLOCKQUOTE:
      case COMMANDS.CODE:
        newState = RichUtils.toggleBlockType(editorState, command);
        break;
      case COMMANDS.BACKSPACE:
        newState = handleBackspaceCommand(editorState, props);
        break;
      case COMMANDS.DELETE:
        newState = handleDeleteCommand(editorState);
        break;
      default:
        newState = RichUtils.handleKeyCommand(editorState, command);
        break;
    }
  }

  if (newState) {
    updateEditorState(newState);
    return 'handled';
  }

  return 'not-handled';
};
