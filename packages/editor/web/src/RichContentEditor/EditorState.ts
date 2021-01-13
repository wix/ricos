import {
  getTextAlignment,
  hasInlineStyle,
  getBlockType,
  hasLinksInSelection,
  getLinkDataInSelection,
} from 'wix-rich-content-editor-common';
import { GetEditorState } from 'wix-rich-content-common';

type InlineStyle = 'BOLD' | 'UNDERLINE' | 'ITALIC';

const createEditorState = (getEditorState: GetEditorState) => {
  const editorState = {
    getSelection: () => getEditorState().getSelection(),
    getTextAlignment: () => getTextAlignment(getEditorState()),
    hasInlineStyle: (style: InlineStyle) => hasInlineStyle(style, getEditorState()),
    isBlockTypeSelected: (type: string) => getBlockType(getEditorState()) === type,
    isUndoStackEmpty: () => getEditorState().getUndoStack().size === 0,
    isRedoStackEmpty: () => getEditorState().getRedoStack().size === 0,
    hasLinkInSelection: () => hasLinksInSelection(getEditorState()),
    getLinkDataInSelection: () => getLinkDataInSelection(getEditorState()),
  };

  return editorState;
};

export default createEditorState;
