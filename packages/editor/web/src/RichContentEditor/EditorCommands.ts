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
  getTextAlignment,
  hasInlineStyle,
  getBlockType,
  hasLinksInSelection,
  getLinkDataInSelection,
  getEntityData,
  insertLinkAtCurrentSelection,
  removeLinksInSelection,
} from 'wix-rich-content-editor-common';
import {
  PluginsDataMap,
  DecorationsDataMap,
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
  RICOS_LINK_TYPE,
  LINK_TYPE,
  RICOS_MENTION_TYPE,
  MENTION_TYPE,
} from 'wix-rich-content-common';

type TextBlockType =
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

type Selection = {
  anchorKey?: string;
  anchorOffset?: number;
  focusKey?: string;
  focusOffset?: number;
  isBackward?: boolean;
  hasFocus?: boolean;
};

const FROM_RICOS_PLUGIN_TYPE_MAP = {
  [RICOS_DIVIDER_TYPE]: DIVIDER_TYPE,
  [RICOS_FILE_TYPE]: FILE_UPLOAD_TYPE,
  [RICOS_GALLERY_TYPE]: GALLERY_TYPE,
  [RICOS_GIPHY_TYPE]: GIPHY_TYPE,
  [RICOS_HTML_TYPE]: HTML_TYPE,
  [RICOS_IMAGE_TYPE]: IMAGE_TYPE,
  [RICOS_VIDEO_TYPE]: VIDEO_TYPE,
  [RICOS_POLL_TYPE]: POLL_TYPE,
  [RICOS_LINK_TYPE]: LINK_TYPE,
  [RICOS_MENTION_TYPE]: MENTION_TYPE,
};

const insertDecorationsMapFuncs = {
  [RICOS_LINK_TYPE]: insertLinkAtCurrentSelection,
  [RICOS_MENTION_TYPE]: () => {}, //WIP
};

const removeDecorationsMapFuncs = {
  [RICOS_LINK_TYPE]: removeLinksInSelection,
  [RICOS_MENTION_TYPE]: () => {}, //WIP
};

export const createEditorCommands = (
  createPluginsDataMap,
  getEditorState: GetEditorState,
  setEditorState: SetEditorState
) => {
  const setBlockType = (type: TextBlockType) => {
    setEditorState(RichUtils.toggleBlockType(getEditorState(), type));
  };

  const setSelection = (blockKey: string, selection: Selection): void =>
    setEditorState(
      EditorState.forceSelection(
        getEditorState(),
        SelectionState.createEmpty(blockKey).merge(selection)
      )
    );

  const editorState = {
    //TODO: fix this type error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getSelection: (): any => getEditorState().getSelection(),
    getSelectedBlockKey: () =>
      getEditorState()
        .getSelection()
        .getAnchorKey(),
    getTextAlignment: (): TextAlignment => getTextAlignment(getEditorState()),
    hasInlineStyle: (style: InlineStyle) => hasInlineStyle(style, getEditorState()),
    isBlockTypeSelected: (type: TextBlockType) => getBlockType(getEditorState()) === type,
    isUndoStackEmpty: () => getEditorState().getUndoStack().size === 0,
    isRedoStackEmpty: () => getEditorState().getRedoStack().size === 0,
    hasLinkInSelection: () => hasLinksInSelection(getEditorState()),
    getLinkDataInSelection: () => getLinkDataInSelection(getEditorState()),
    getSelectedBlockData: () => getEntityData(getEditorState()) || {},
  };

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
        const data = createPluginData(config, editorState.getSelectedBlockData());
        if (data) {
          const newEditorState = updateEntityData(getEditorState(), blockKey, data);
          setEditorState(EditorState.forceSelection(newEditorState, newEditorState.getSelection()));
        }
      }
    },
    deleteBlock: (blockKey: string) => setEditorState(deleteBlock(getEditorState(), blockKey)),
  };

  const decorationsCommands = {
    insertDecoration: <K extends keyof DecorationsDataMap>(
      type: K,
      config?: DecorationsDataMap[K]
    ) => {
      const draftType = FROM_RICOS_PLUGIN_TYPE_MAP[type];
      const { [draftType]: createPluginData } = createPluginsDataMap;
      if (createPluginData) {
        const data = createPluginData(config);
        if (data) {
          const newEditorState = insertDecorationsMapFuncs[type]?.(getEditorState(), data);
          if (newEditorState) {
            setEditorState(newEditorState);
          }
        }
      }
    },
    removeDecoration: <K extends keyof DecorationsDataMap>(type: K) => {
      const newEditorState = removeDecorationsMapFuncs[type]?.(getEditorState());
      if (newEditorState) {
        setEditorState(newEditorState);
      }
    },
  };

  const editorCommands = {
    ...textFormattingCommands,
    ...pluginsCommands,
    ...decorationsCommands,
    ...editorState,
  };
  return editorCommands;
};
