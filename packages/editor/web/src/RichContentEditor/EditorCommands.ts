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
import { PluginsDataMap, GetEditorState, SetEditorState } from 'wix-rich-content-common';

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

type InlineStyle = 'bold' | 'underline' | 'italic';

const createEditorCommands = (
  createPluginsDataMap,
  getEditorState: GetEditorState,
  setEditorState: SetEditorState
) => {
  const setBlockType = (type: BlockType) => {
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
      setEditorState(RichUtils.toggleInlineStyle(getEditorState(), style.toUpperCase())),
    setBlockType,
    setTextAlignment: (textAlignment: TextAlignment): void =>
      setEditorState(setTextAlignment(getEditorState(), textAlignment)),
    setSelection,
  };

  const pluginsCommands = {
    insertBlock: <K extends keyof PluginsDataMap>(
      type: K,
      config?: PluginsDataMap[K],
      shouldForceFocus = true
    ) => {
      const { [type]: createPluginData } = createPluginsDataMap;
      if (createPluginData) {
        const data = createPluginData(config);
        if (data) {
          const { newSelection, newEditorState } = createBlock(getEditorState(), data, type);
          setEditorState(
            shouldForceFocus
              ? EditorState.forceSelection(newEditorState, newSelection)
              : EditorState.acceptSelection(newEditorState, newSelection)
          );
          return { blockKey: newSelection.getAnchorKey(), data };
        }
      }
    },
    updateBlock: <K extends keyof PluginsDataMap>(
      blockKey: string,
      type: K,
      config?: PluginsDataMap[K]
    ) => {
      const { [type]: createPluginData } = createPluginsDataMap;
      if (createPluginData) {
        const data = createPluginData(config);
        if (data) {
          setEditorState(updateEntityData(getEditorState(), blockKey, data));
          return { blockKey, data };
        }
      }
    },
    deleteBlock: (blockKey: string) => setEditorState(deleteBlock(getEditorState(), blockKey)),
  };

  const editorCommands = { ...textFormattingCommands, ...pluginsCommands };
  return editorCommands;
};

export default createEditorCommands;
