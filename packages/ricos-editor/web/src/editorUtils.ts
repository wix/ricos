import { convertToRaw } from 'wix-rich-content-editor-common';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import { EditorState } from 'draft-js';
import { debounce } from 'lodash';
import { emptyState } from 'ricos-viewer/dist/es/lib/utils';

/* eslint-disable no-console */
export const assert = (predicate, message) => console.assert(predicate, message);

export function createDataConverter(): EditorDataInstance {
  let currState: RicosContent = emptyState;
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
