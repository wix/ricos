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
  InlineStyle,
  TextAlignment,
} from 'wix-rich-content-editor-common';
import { PluginsDataMap, GetEditorState, SetEditorState } from 'wix-rich-content-common';
import { BlockType, Selection, FROM_RICOS_PLUGIN_TYPE_MAP } from './EditorState';

export const createEditorCommands = (
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
    insertBlock: <K extends keyof PluginsDataMap>(type: K, config?: PluginsDataMap[K]) => {
      const draftType = FROM_RICOS_PLUGIN_TYPE_MAP[type];
      const { [draftType]: createPluginData } = createPluginsDataMap;
      if (createPluginData) {
        const data = createPluginData(config);
        if (data) {
          const { newSelection, newEditorState } = createBlock(getEditorState(), data, draftType);
          setEditorState(EditorState.forceSelection(newEditorState, newSelection));
        }
      }
    },
    updateBlock: <K extends keyof PluginsDataMap>(
      blockKey: string,
      type: K,
      config?: PluginsDataMap[K]
    ) => {
      const draftType = FROM_RICOS_PLUGIN_TYPE_MAP[type];
      const { [draftType]: createPluginData } = createPluginsDataMap;
      if (createPluginData) {
        const data = createPluginData(config);
        if (data) {
          const newEditorState = updateEntityData(getEditorState(), blockKey, data);
          setEditorState(EditorState.forceSelection(newEditorState, newEditorState.getSelection()));
        }
      }
    },
    deleteBlock: (blockKey: string) => setEditorState(deleteBlock(getEditorState(), blockKey)),
  };

  const editorCommands = { ...textFormattingCommands, ...pluginsCommands };
  return editorCommands;
};
