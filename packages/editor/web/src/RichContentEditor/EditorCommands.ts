import {
  EditorState,
  SelectionState,
  RichUtils,
  setTextAlignment,
  createBlock,
  updateEntityData,
  deleteBlock,
} from 'wix-rich-content-editor-common';
import { GetEditorState, SetEditorState } from 'wix-rich-content-common';

type TextAlignment = 'left' | 'center' | 'right' | 'justify';

type Selection = {
  anchorKey?: string;
  anchorOffset?: number;
  focusKey?: string;
  focusOffset?: number;
  isBackward?: boolean;
  hasFocus?: boolean;
};

type BlockType =
  | 'unstyled'
  | 'ordered-list-item'
  | 'unordered-list-item'
  | 'code-block'
  | 'blockquote'
  | 'header-one'
  | 'header-two'
  | 'header-three'
  | 'header-four'
  | 'header-five'
  | 'header-six';

type InlineStyle = 'BOLD' | 'UNDERLINE' | 'ITALIC';

const createEditorCommands = (
  pluginsData,
  getEditorState: GetEditorState,
  setEditorState: SetEditorState
) => {
  const setBlockType = (type: string) => {
    setEditorState(RichUtils.toggleBlockType(getEditorState(), type));
  };

  const setSelection = (blockKey: string, selection: Selection): void =>
    setEditorState(
      EditorState.forceSelection(
        getEditorState(),
        SelectionState.createEmpty(blockKey).merge(selection)
      )
    );

  const textFormattingCommands = {
    undo: (): void => setEditorState(EditorState.undo(getEditorState())),
    redo: (): void => setEditorState(EditorState.redo(getEditorState())),
    toggleInlineStyle: (style: InlineStyle): void =>
      setEditorState(RichUtils.toggleInlineStyle(getEditorState(), style)),
    setBlockType: (type: BlockType) => setBlockType(type),
    setTextAlignment: (textAlignment: TextAlignment): void =>
      setEditorState(setTextAlignment(getEditorState(), textAlignment)),
    setSelection,
  };

  const pluginsCommands = {
    insertBlock: (type: string, config = {}) => {
      const { [type]: pluginData } = pluginsData;
      const data = { ...pluginData, ...config };
      const { newSelection, newEditorState } = createBlock(getEditorState(), data, type);
      setEditorState(EditorState.forceSelection(newEditorState, newSelection));
    },
    updateBlock: (blockKey: string, data) =>
      setEditorState(updateEntityData(getEditorState(), blockKey, data)),
    deleteBlock: (blockKey: string) => setEditorState(deleteBlock(getEditorState(), blockKey)),
  };

  const editorCommands = { ...textFormattingCommands, ...pluginsCommands };
  return editorCommands;
};

export default createEditorCommands;
