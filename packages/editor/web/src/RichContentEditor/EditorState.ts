import {
  getTextAlignment,
  hasInlineStyle,
  getBlockType,
  hasLinksInSelection,
  getLinkDataInSelection,
} from 'wix-rich-content-editor-common';
import {
  GetEditorState,
  ACTION_BUTTON_TYPE,
  CODE_BLOCK_TYPE,
  DIVIDER_TYPE,
  FILE_UPLOAD_TYPE,
  GALLERY_TYPE,
  GIPHY_TYPE,
  HTML_TYPE,
  IMAGE_TYPE,
  IMAGE_TYPE_LEGACY,
  LINK_PREVIEW_TYPE,
  MAP_TYPE,
  SOUND_CLOUD_TYPE,
  VERTICAL_EMBED_TYPE,
  VIDEO_TYPE,
  VIDEO_TYPE_LEGACY,
  POLL_TYPE,
  ACCORDION_TYPE,
  TABLE_TYPE,
  UNSUPPORTED_BLOCKS_TYPE,
} from 'wix-rich-content-common';

type InlineStyle = 'bold' | 'underline' | 'italic';

type PluginType =
  | typeof ACTION_BUTTON_TYPE
  | typeof CODE_BLOCK_TYPE
  | typeof DIVIDER_TYPE
  | typeof FILE_UPLOAD_TYPE
  | typeof GALLERY_TYPE
  | typeof GIPHY_TYPE
  | typeof HTML_TYPE
  | typeof IMAGE_TYPE
  | typeof IMAGE_TYPE_LEGACY
  | typeof LINK_PREVIEW_TYPE
  | typeof MAP_TYPE
  | typeof SOUND_CLOUD_TYPE
  | typeof VERTICAL_EMBED_TYPE
  | typeof VIDEO_TYPE
  | typeof VIDEO_TYPE_LEGACY
  | typeof POLL_TYPE
  | typeof ACCORDION_TYPE
  | typeof TABLE_TYPE
  | typeof UNSUPPORTED_BLOCKS_TYPE;

const createEditorState = (getEditorState: GetEditorState) => {
  const editorState = {
    //TODO: fix this type error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getSelection: (): any => {
      return getEditorState().getSelection();
    },
    getTextAlignment: () => getTextAlignment(getEditorState()),
    hasInlineStyle: (style: InlineStyle) => hasInlineStyle(style.toUpperCase(), getEditorState()),
    isBlockTypeSelected: (type: PluginType) => getBlockType(getEditorState()) === type,
    isUndoStackEmpty: () => getEditorState().getUndoStack().size === 0,
    isRedoStackEmpty: () => getEditorState().getRedoStack().size === 0,
    hasLinkInSelection: () => hasLinksInSelection(getEditorState()),
    getLinkDataInSelection: () => getLinkDataInSelection(getEditorState()),
  };

  return editorState;
};

export default createEditorState;
