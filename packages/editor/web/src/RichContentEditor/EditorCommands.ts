import {
  EditorState,
  SelectionState,
  RichUtils,
  setTextAlignment,
  createBlock,
  updateEntityData,
  deleteBlock,
  undo,
  redo,
} from 'wix-rich-content-editor-common';
import { CreatePluginsDataMap, GetEditorState, SetEditorState } from 'wix-rich-content-common';

type Left = 'left';
type Center = 'center';
type Right = 'right';
type Justify = 'justify';

type TextAlignment = Left | Center | Right | Justify;

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
  createPluginsDataMap: CreatePluginsDataMap,
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
    undo: (): void => setEditorState(undo(getEditorState())),
    redo: (): void => setEditorState(redo(getEditorState())),
    toggleInlineStyle: (style: InlineStyle): void =>
      setEditorState(RichUtils.toggleInlineStyle(getEditorState(), style)),
    setBlockType: (type: BlockType) => setBlockType(type),
    setTextAlignment: (textAlignment: TextAlignment): void =>
      setEditorState(setTextAlignment(getEditorState(), textAlignment)),
    setSelection,
  };

  const pluginsCommands = {
    insertBlock: <K extends keyof CreatePluginsDataMap>(
      type: K,
      config?: Parameters<CreatePluginsDataMap[K] & []>[0]
    ) => {
      const { [type]: createPluginData } = createPluginsDataMap;
      if (createPluginData) {
        const data = createPluginData(config);
        const { newSelection, newEditorState } = createBlock(getEditorState(), data, type);
        setEditorState(EditorState.forceSelection(newEditorState, newSelection));
      }
    },
    updateBlock: (blockKey: string, data) =>
      setEditorState(updateEntityData(getEditorState(), blockKey, data)),
    deleteBlock: (blockKey: string) => setEditorState(deleteBlock(getEditorState(), blockKey)),
  };

  const editorCommands = { ...textFormattingCommands, ...pluginsCommands };
  return editorCommands;
};

export default createEditorCommands;
