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
import {
  PluginsDataMap,
  GetEditorState,
  SetEditorState,
  IMAGE_TYPE,
  DIVIDER_TYPE,
  FILE_UPLOAD_TYPE,
  GALLERY_TYPE,
  GIPHY_TYPE,
  HTML_TYPE,
  POLL_TYPE,
  VIDEO_TYPE,
  RICOS_DIVIDER_TYPE,
  RICOS_GALLERY_TYPE,
  RICOS_GIPHY_TYPE,
  RICOS_HTML_TYPE,
  RICOS_IMAGE_TYPE,
  RICOS_VIDEO_TYPE,
  RICOS_POLL_TYPE,
  RICOS_FILE_TYPE,
} from 'wix-rich-content-common';

const FROM_RICOS_PLUGIN_TYPE_MAP = {
  [RICOS_DIVIDER_TYPE]: DIVIDER_TYPE,
  [RICOS_FILE_TYPE]: FILE_UPLOAD_TYPE,
  [RICOS_GALLERY_TYPE]: GALLERY_TYPE,
  [RICOS_GIPHY_TYPE]: GIPHY_TYPE,
  [RICOS_HTML_TYPE]: HTML_TYPE,
  [RICOS_IMAGE_TYPE]: IMAGE_TYPE,
  [RICOS_VIDEO_TYPE]: VIDEO_TYPE,
  [RICOS_POLL_TYPE]: POLL_TYPE,
};

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
    insertBlock: <K extends keyof PluginsDataMap>(
      type: K,
      config?: PluginsDataMap[K],
      shouldForceFocus = true
    ) => {
      const oldType = FROM_RICOS_PLUGIN_TYPE_MAP[type];
      const { [oldType]: createPluginData } = createPluginsDataMap;
      if (createPluginData) {
        const data = createPluginData(config);
        if (data) {
          const { newSelection, newEditorState } = createBlock(getEditorState(), data, oldType);
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
      const oldType = FROM_RICOS_PLUGIN_TYPE_MAP[type];
      const { [oldType]: createPluginData } = createPluginsDataMap;
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
