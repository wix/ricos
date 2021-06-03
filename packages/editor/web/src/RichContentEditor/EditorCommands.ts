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
  getAnchorableBlocks,
} from 'wix-rich-content-editor-common';
import {
  PluginsDataMap,
  DecorationsDataMap,
  GetEditorState,
  SetEditorState,
  TextAlignment,
  InlineStyle,
  ACCORDION_TYPE,
  ACTION_BUTTON_TYPE,
  LINK_BUTTON_TYPE,
  EMOJI_TYPE,
  HASHTAG_TYPE,
  HEADERS_MARKDOWN_TYPE,
  LINE_SPACING_TYPE,
  INDENT_TYPE,
  TABLE_TYPE,
  EXTERNAL_LINK_TYPE,
  LINK_PREVIEW_TYPE,
  SPOILER_TYPE,
  UNDO_REDO_TYPE,
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  VERTICAL_EMBED_TYPE,
  IMAGE_TYPE,
  SOUND_CLOUD_TYPE,
  MAP_TYPE,
  HEADINGS_DROPDOWN_TYPE,
  DIVIDER_TYPE,
  FILE_UPLOAD_TYPE,
  GALLERY_TYPE,
  GIPHY_TYPE,
  HTML_TYPE,
  POLL_TYPE,
  VIDEO_TYPE,
  LINK_TYPE,
  MENTION_TYPE,
  CODE_BLOCK_TYPE,
  RICOS_ACCORDION_TYPE,
  RICOS_ACTION_BUTTON_TYPE,
  RICOS_LINK_BUTTON_TYPE,
  RICOS_EMOJI_TYPE,
  RICOS_HASHTAG_TYPE,
  RICOS_HEADERS_MARKDOWN_TYPE,
  RICOS_LINE_SPACING_TYPE,
  RICOS_INDENT_TYPE,
  RICOS_TABLE_TYPE,
  RICOS_EXTERNAL_LINK_TYPE,
  RICOS_LINK_PREVIEW_TYPE,
  RICOS_SPOILER_TYPE,
  RICOS_UNDO_REDO_TYPE,
  RICOS_HEADINGS_DROPDOWN_TYPE,
  RICOS_MAP_TYPE,
  RICOS_SOUND_CLOUD_TYPE,
  RICOS_TEXT_COLOR_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
  RICOS_VERTICAL_EMBED_TYPE,
  RICOS_IMAGE_TYPE,
  RICOS_DIVIDER_TYPE,
  RICOS_FILE_TYPE,
  RICOS_GALLERY_TYPE,
  RICOS_GIPHY_TYPE,
  RICOS_HTML_TYPE,
  RICOS_POLL_TYPE,
  RICOS_VIDEO_TYPE,
  RICOS_LINK_TYPE,
  RICOS_MENTION_TYPE,
  RICOS_CODE_BLOCK_TYPE,
  HEADER_BLOCK,
  BLOCKQUOTE,
  UNSTYLED,
  NUMBERED_LIST_TYPE,
  BULLET_LIST_TYPE,
  UNSUPPORTED_BLOCKS_TYPE,
} from 'wix-rich-content-common';

type PluginsList = string[];

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

const TO_DRAFT_PLUGIN_TYPE_MAP = {
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

const TO_RICOS_PLUGIN_TYPE_MAP = {
  [DIVIDER_TYPE]: RICOS_DIVIDER_TYPE,
  [FILE_UPLOAD_TYPE]: RICOS_FILE_TYPE,
  [GALLERY_TYPE]: RICOS_GALLERY_TYPE,
  [GIPHY_TYPE]: RICOS_GIPHY_TYPE,
  [HTML_TYPE]: RICOS_HTML_TYPE,
  [IMAGE_TYPE]: RICOS_IMAGE_TYPE,
  [VIDEO_TYPE]: RICOS_VIDEO_TYPE,
  [POLL_TYPE]: RICOS_POLL_TYPE,
  [LINK_TYPE]: RICOS_LINK_TYPE,
  [MENTION_TYPE]: RICOS_MENTION_TYPE,
  [ACCORDION_TYPE]: RICOS_ACCORDION_TYPE,
  [ACTION_BUTTON_TYPE]: RICOS_ACTION_BUTTON_TYPE,
  [LINK_BUTTON_TYPE]: RICOS_LINK_BUTTON_TYPE,
  [CODE_BLOCK_TYPE]: RICOS_CODE_BLOCK_TYPE,
  [EMOJI_TYPE]: RICOS_EMOJI_TYPE,
  [HASHTAG_TYPE]: RICOS_HASHTAG_TYPE,
  [HEADERS_MARKDOWN_TYPE]: RICOS_HEADERS_MARKDOWN_TYPE,
  [INDENT_TYPE]: RICOS_INDENT_TYPE,
  [LINE_SPACING_TYPE]: RICOS_LINE_SPACING_TYPE,
  [TABLE_TYPE]: RICOS_TABLE_TYPE,
  [EXTERNAL_LINK_TYPE]: RICOS_EXTERNAL_LINK_TYPE,
  [LINK_PREVIEW_TYPE]: RICOS_LINK_PREVIEW_TYPE,
  [SPOILER_TYPE]: RICOS_SPOILER_TYPE,
  [UNDO_REDO_TYPE]: RICOS_UNDO_REDO_TYPE,
  [HEADINGS_DROPDOWN_TYPE]: RICOS_HEADINGS_DROPDOWN_TYPE,
  [MAP_TYPE]: RICOS_MAP_TYPE,
  [SOUND_CLOUD_TYPE]: RICOS_SOUND_CLOUD_TYPE,
  [TEXT_COLOR_TYPE]: RICOS_TEXT_COLOR_TYPE,
  [TEXT_HIGHLIGHT_TYPE]: RICOS_TEXT_HIGHLIGHT_TYPE,
  [VERTICAL_EMBED_TYPE]: RICOS_VERTICAL_EMBED_TYPE,
};

export const PluginsToExclude = [UNSUPPORTED_BLOCKS_TYPE];

const triggerDecorationsMap = {
  [RICOS_MENTION_TYPE]: triggerMention,
};

const insertDecorationsMap = {
  [RICOS_LINK_TYPE]: insertLinkAtCurrentSelection,
  [RICOS_MENTION_TYPE]: insertMention,
};

const deleteDecorationsMapFuncs = {
  [RICOS_LINK_TYPE]: removeLinksInSelection,
};

export const createEditorCommands = (
  createPluginsDataMap,
  plugins,
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

  const normalizePluginsList = (pluginsList: PluginsList) =>
    pluginsList.filter(pluginName => pluginName && !PluginsToExclude.includes[pluginName]);

  const editorState = {
    // TODO: check if needed, plus type error using SelectionState, not sure why
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _getSelection: (): any => getEditorState().getSelection(),
    getAnchorableBlocks: () => getAnchorableBlocks(getEditorState()),
    getTextAlignment: () => getTextAlignment(getEditorState()),
    hasInlineStyle: (style: InlineStyle) => hasInlineStyle(style, getEditorState()),
    isBlockTypeSelected: (type: TextBlockType) => getBlockType(getEditorState()) === type,
    isUndoStackEmpty: () => getEditorState().getUndoStack().size === 0,
    isRedoStackEmpty: () => getEditorState().getRedoStack().size === 0,
    hasLinkInSelection: () => hasLinksInSelection(getEditorState()),
    getLinkDataInSelection: () => getLinkDataInSelection(getEditorState()),
    getSelectedData: () => getEntityData(getEditorState()) || {},
    getPluginsList: (settings?: { isRicosSchema?: boolean }): PluginsList => {
      const { isRicosSchema } = settings || {};
      const pluginsList = plugins?.map(plugin =>
        isRicosSchema ? TO_RICOS_PLUGIN_TYPE_MAP[plugin.blockType] : plugin.blockType
      );
      return normalizePluginsList(pluginsList);
    },
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
      const draftType = TO_DRAFT_PLUGIN_TYPE_MAP[type];
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
      const draftType = TO_DRAFT_PLUGIN_TYPE_MAP[type];
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
      const draftType = TO_DRAFT_PLUGIN_TYPE_MAP[type];
      const { [draftType]: createPluginData } = createPluginsDataMap;
      const pluginData = createPluginData(data, settings?.isRicosSchema);
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
