import {
  COMMANDS,
  TEXT_TYPES,
  mergeBlockData,
  RichUtils,
  onTab,
} from 'wix-rich-content-editor-common';
import handleBackspaceCommand from './handleBackspaceCommand';
import handleDeleteCommand from './handleDeleteCommand';
const isList = blockType =>
  blockType === 'ordered-list-item' || blockType === 'unordered-list-item';

const isText = blockType => {
  return TEXT_TYPES.some(type => type === blockType);
};

export default (updateEditorState, customHandlers, blockType) => (command, editorState) => {
  let newState;

  if (customHandlers[command] && isText(blockType)) {
    const maxDepth = isList(blockType) ? 2 : 4;
    // eslint-disable-next-line no-restricted-globals
    newState = onTab(event, editorState, maxDepth);
  } else if (customHandlers[command]) {
    newState = customHandlers[command](editorState);
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
        newState = handleBackspaceCommand(editorState);
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
