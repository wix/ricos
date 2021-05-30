import { pick } from 'lodash';
import {
  EditorState,
  SelectionState,
  RichUtils,
  setTextAlignment,
  createBlock,
  setEntityData,
  blockKeyToEntityKey,
  deleteBlock,
  undo,
  redo,
  getTextAlignment,
  hasInlineStyle,
  getDraftInlineStyle,
  getBlockType,
  hasLinksInSelection,
  getLinkDataInSelection,
  getEntityData,
  insertLinkAtCurrentSelection,
  removeLinksInSelection,
  triggerMention,
  insertMention,
  indentSelectedBlocks,
  mergeBlockData,
  getAnchorBlockData,
} from 'wix-rich-content-editor-common';
import {
  PluginsDataMap,
  DecorationsDataMap,
  GetEditorState,
  SetEditorState,
  TextAlignment,
  InlineStyle,
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
  CODE_BLOCK_TYPE,
  HEADER_BLOCK,
  BLOCKQUOTE,
  UNSTYLED,
  NUMBERED_LIST_TYPE,
  BULLET_LIST_TYPE,
  INDENT_TYPE,
  LINE_SPACING_TYPE,
} from 'wix-rich-content-common';

type TextBlockType =
  | typeof UNSTYLED
  | typeof NUMBERED_LIST_TYPE
  | typeof BULLET_LIST_TYPE
  | typeof CODE_BLOCK_TYPE
  | typeof BLOCKQUOTE
  | typeof HEADER_BLOCK.ONE
  | typeof HEADER_BLOCK.TWO
  | typeof HEADER_BLOCK.THREE
  | typeof HEADER_BLOCK.FOUR
  | typeof HEADER_BLOCK.FIVE
  | typeof HEADER_BLOCK.SIX;

type Selection = {
  anchorKey?: string;
  anchorOffset?: number;
  focusKey?: string;
  focusOffset?: number;
  isBackward?: boolean;
  hasFocus?: boolean;
};

const PLUGIN_TYPE_MAP = {
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
  [DIVIDER_TYPE]: DIVIDER_TYPE,
  [FILE_UPLOAD_TYPE]: FILE_UPLOAD_TYPE,
  [GALLERY_TYPE]: GALLERY_TYPE,
  [GIPHY_TYPE]: GIPHY_TYPE,
  [HTML_TYPE]: HTML_TYPE,
  [IMAGE_TYPE]: IMAGE_TYPE,
  [VIDEO_TYPE]: VIDEO_TYPE,
  [POLL_TYPE]: POLL_TYPE,
};

const triggerDecorationsMap = {
  [RICOS_MENTION_TYPE]: triggerMention,
};

const insertDecorationsMap = {
  [RICOS_LINK_TYPE]: insertLinkAtCurrentSelection,
  [RICOS_MENTION_TYPE]: insertMention,
  [INDENT_TYPE]: indentSelectedBlocks,
  [LINE_SPACING_TYPE]: mergeBlockData,
};

const deleteDecorationsMapFuncs = {
  [RICOS_LINK_TYPE]: removeLinksInSelection,
};

const lineHeight = 'line-height';
const spaceBefore = 'padding-top';
const spaceAfter = 'padding-bottom';

let savedEditorState;
let savedSelectionState;

export const createEditorCommands = (
  createPluginsDataMap,
  getEditorState: GetEditorState,
  setEditorState: SetEditorState
) => {
  const setBlockType = (type: TextBlockType) => {
    setEditorState(RichUtils.toggleBlockType(getEditorState(), type));
  };

  const setSelection = (blockKey: string, selection?: Selection): void =>
    setEditorState(
      EditorState.forceSelection(
        getEditorState(),
        SelectionState.createEmpty(blockKey).merge(selection || {})
      )
    );

  const getBlockSpacing = () => {
    const { dynamicStyles = {} } = getAnchorBlockData(getEditorState());
    return pick(dynamicStyles, [lineHeight, spaceBefore, spaceAfter]);
  };

  const saveEditorState = () => {
    savedEditorState = getEditorState();
  };

  const saveSelectionState = () => {
    savedSelectionState = getEditorState().getSelection();
  };

  const loadEditorState = () => {
    const selection = savedEditorState.getSelection();
    setEditorState(EditorState.forceSelection(savedEditorState, selection));
  };

  const loadSelectionState = () => {
    setEditorState(EditorState.forceSelection(getEditorState(), savedSelectionState));
  };

  const editorState = {
    // TODO: check if needed, plus type error using SelectionState, not sure why
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getSelection: (): any => getEditorState().getSelection(),
    getTextAlignment: () => getTextAlignment(getEditorState()),
    hasInlineStyle: (style: InlineStyle) => hasInlineStyle(style, getEditorState()),
    isBlockTypeSelected: (type: TextBlockType) => getBlockType(getEditorState()) === type,
    isUndoStackEmpty: () => getEditorState().getUndoStack().size === 0,
    isRedoStackEmpty: () => getEditorState().getRedoStack().size === 0,
    hasLinkInSelection: () => hasLinksInSelection(getEditorState()),
    getLinkDataInSelection: () => getLinkDataInSelection(getEditorState()),
    getSelectedData: () => getEntityData(getEditorState()) || {},
    getBlockSpacing,
    saveEditorState,
    loadEditorState,
    saveSelectionState,
    loadSelectionState,
  };

  const textFormattingCommands = {
    undo: (): void => setEditorState(undo(getEditorState())),
    redo: (): void => setEditorState(redo(getEditorState())),
    toggleInlineStyle: (inlineStyle: InlineStyle): void =>
      setEditorState(
        RichUtils.toggleInlineStyle(getEditorState(), getDraftInlineStyle(inlineStyle))
      ),
    setBlockType,
    setTextAlignment: (textAlignment: TextAlignment): void =>
      setEditorState(setTextAlignment(getEditorState(), textAlignment)),
    setSelection,
  };

  const pluginsCommands = {
    insertBlock: <K extends keyof PluginsDataMap>(
      type: K,
      data?: PluginsDataMap[K],
      settings?: { isRicosSchema?: boolean }
    ): string => {
      const draftType = PLUGIN_TYPE_MAP[type];
      const { [draftType]: createPluginData } = createPluginsDataMap;
      const pluginData = createPluginData(data, settings?.isRicosSchema);
      const { newBlock, newSelection, newEditorState } = createBlock(
        getEditorState(),
        pluginData,
        draftType
      );
      setEditorState(EditorState.forceSelection(newEditorState, newSelection));
      return newBlock.getKey();
    },
    setBlock: <K extends keyof PluginsDataMap>(
      blockKey: string,
      type: K,
      data?: PluginsDataMap[K],
      settings?: { isRicosSchema?: boolean }
    ) => {
      const draftType = PLUGIN_TYPE_MAP[type];
      const { [draftType]: createPluginData } = createPluginsDataMap;
      const pluginData = createPluginData(data, settings?.isRicosSchema);
      const entityKey = blockKeyToEntityKey(getEditorState(), blockKey);
      const newEditorState = setEntityData(getEditorState(), entityKey, pluginData);
      const newSelection = newEditorState.getSelection();
      setEditorState(EditorState.forceSelection(newEditorState, newSelection));
    },
    deleteBlock: (blockKey: string) => setEditorState(deleteBlock(getEditorState(), blockKey)),
  };

  const decorationsCommands = {
    insertDecoration: <K extends keyof DecorationsDataMap>(
      type: K,
      data?: DecorationsDataMap[K],
      settings?: { isRicosSchema?: boolean }
    ) => {
      const draftType = PLUGIN_TYPE_MAP[type];
      const { [draftType]: createPluginData } = createPluginsDataMap;
      const pluginData = createPluginData ? createPluginData(data, settings?.isRicosSchema) : data;
      const newEditorState = insertDecorationsMap[type]?.(getEditorState(), pluginData);
      if (newEditorState) {
        setEditorState(newEditorState);
      }
    },
    triggerDecoration: <K extends keyof Omit<DecorationsDataMap, typeof RICOS_LINK_TYPE>>(
      type: K
    ) => {
      const newEditorState = triggerDecorationsMap[type]?.(getEditorState());
      if (newEditorState) {
        setEditorState(newEditorState);
      }
    },
    deleteDecoration: <K extends keyof Omit<DecorationsDataMap, typeof RICOS_MENTION_TYPE>>(
      type: K
    ) => {
      const newEditorState = deleteDecorationsMapFuncs[type]?.(getEditorState());
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
