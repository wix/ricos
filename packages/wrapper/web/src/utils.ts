import { convertToRaw } from 'wix-rich-content-editor-common';
import { debounce } from 'lodash';
import { RawDraftContentState, EditorState } from 'draft-js';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import { EditorDataInstance } from './RichContentWrapperTypes';

/* eslint-disable no-console */
export const assert = (predicate, message) => console.assert(predicate, message);
export const emptyState: RawDraftContentState = { blocks: [], entityMap: {} };

export function createDataConverter(): EditorDataInstance {
  let currState: RawDraftContentState = emptyState;
  let currEditorState: EditorState = createEmpty();
  let isUpdated = false;
  const getContentState = () => {
    if (!isUpdated) {
      currState = convertToRaw(currEditorState.getCurrentContent());
      isUpdated = true;
    }
    return currState;
  };
  const debounceUpdate = debounce(getContentState, 200);
  return {
    getContentState,
    refresh: (editorState: EditorState) => {
      isUpdated = false;
      currEditorState = editorState;
      debounceUpdate();
    },
  };
}
