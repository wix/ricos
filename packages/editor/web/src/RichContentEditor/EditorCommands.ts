import { EditorState, RichUtils, COMMANDS, setTextAlignment } from 'wix-rich-content-editor-common';
import { GetEditorState, SetEditorState } from 'wix-rich-content-common';

type TextAlignment = 'left' | 'center' | 'right';

const createEditorCommands = (getEditorState: GetEditorState, setEditorState: SetEditorState) => {
  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(getEditorState(), style));
  };

  const toggleBlockType = (type: string) => {
    setEditorState(RichUtils.toggleBlockType(getEditorState(), type));
  };

  const textFormattingCommands = {
    undo: (): void => setEditorState(EditorState.undo(getEditorState())),
    redo: (): void => setEditorState(EditorState.redo(getEditorState())),
    bold: (): void => toggleInlineStyle(COMMANDS.BOLD),
    italic: (): void => toggleInlineStyle(COMMANDS.ITALIC),
    underline: (): void => toggleInlineStyle(COMMANDS.UNDERLINE),
    orderedList: (): void => toggleBlockType(COMMANDS.NUMBERED_LIST),
    unorderedList: (): void => toggleBlockType(COMMANDS.BULLET_LIST),
    blockquote: (): void => toggleBlockType(COMMANDS.BLOCKQUOTE),
    codeBlock: (): void => toggleBlockType(COMMANDS.CODE),
    headerOne: (): void => toggleBlockType(COMMANDS.HEADER_ONE),
    headerTwo: (): void => toggleBlockType(COMMANDS.HEADER_TWO),
    headerThree: (): void => toggleBlockType(COMMANDS.HEADER_THREE),
    headerFour: (): void => toggleBlockType(COMMANDS.HEADER_FOUR),
    headerFive: (): void => toggleBlockType(COMMANDS.HEADER_FIVE),
    headerSix: (): void => toggleBlockType(COMMANDS.HEADER_SIX),
    setTextAlignment: (textAlignment: TextAlignment): void =>
      setEditorState(setTextAlignment(getEditorState(), textAlignment)),
  };

  const editorCommands = { ...textFormattingCommands };

  return editorCommands;
};

export default createEditorCommands;
