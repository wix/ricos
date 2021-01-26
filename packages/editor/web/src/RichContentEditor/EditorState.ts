import {
  TextAlignment,
  getTextAlignment,
  InlineStyle,
  hasInlineStyle,
  getBlockType,
  hasLinksInSelection,
  getLinkDataInSelection,
  getEntityData,
} from 'wix-rich-content-editor-common';
import {
  GetEditorState,
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

export type BlockType =
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

export type Selection = {
  anchorKey?: string;
  anchorOffset?: number;
  focusKey?: string;
  focusOffset?: number;
  isBackward?: boolean;
  hasFocus?: boolean;
};

export const FROM_RICOS_PLUGIN_TYPE_MAP = {
  [RICOS_DIVIDER_TYPE]: DIVIDER_TYPE,
  [RICOS_FILE_TYPE]: FILE_UPLOAD_TYPE,
  [RICOS_GALLERY_TYPE]: GALLERY_TYPE,
  [RICOS_GIPHY_TYPE]: GIPHY_TYPE,
  [RICOS_HTML_TYPE]: HTML_TYPE,
  [RICOS_IMAGE_TYPE]: IMAGE_TYPE,
  [RICOS_VIDEO_TYPE]: VIDEO_TYPE,
  [RICOS_POLL_TYPE]: POLL_TYPE,
};

export const createEditorState = (getEditorState: GetEditorState) => {
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
    isBlockTypeSelected: (type: BlockType | 'atomic') => getBlockType(getEditorState()) === type,
    isUndoStackEmpty: () => getEditorState().getUndoStack().size === 0,
    isRedoStackEmpty: () => getEditorState().getRedoStack().size === 0,
    hasLinkInSelection: () => hasLinksInSelection(getEditorState()),
    getLinkDataInSelection: () => getLinkDataInSelection(getEditorState()),
    getSelectedBlockData: () => getEntityData(getEditorState()) || {},
  };

  return editorState;
};
