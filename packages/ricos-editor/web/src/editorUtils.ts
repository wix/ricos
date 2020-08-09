import { createEmpty, convertToRaw } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import { EditorState } from 'draft-js';
import { debounce } from 'lodash';
import { emptyState } from 'ricos-common';
import { isSSR } from 'wix-rich-content-common';
import { RicosContent, EditorDataInstance, OnContentChangeFunction } from './index';

/* eslint-disable no-console */
export const assert = (predicate, message) => console.assert(predicate, message);

export function createDataConverter(lateOnChange?: OnContentChangeFunction): EditorDataInstance {
  let currState: RicosContent = emptyState;
  let currEditorState: EditorState = createEmpty();
  let isUpdated = false;
  const getContentState = () => {
    if (!isUpdated) {
      currState = convertToRaw(currEditorState.getCurrentContent());
      isUpdated = true;
    }
    lateOnChange?.(currState);
    return currState;
  };
  const debounceUpdate = debounce(getContentState, 200);
  return {
    getContentState,
    refresh: editorState => {
      if (!isSSR()) {
        isUpdated = false;
        currEditorState = editorState;
        debounceUpdate();
      }
    },
  };
}
