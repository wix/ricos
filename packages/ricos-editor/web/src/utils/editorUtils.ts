import { createEmpty, convertToRaw } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import { EditorState, ContentState } from 'draft-js';
import { debounce } from 'lodash';
import { emptyState } from 'ricos-common';
import { isSSR } from 'wix-rich-content-common';
import { RicosContent, EditorDataInstance, OnContentChangeFunction } from '../index';

/* eslint-disable no-console */
export const assert = (predicate, message) => console.assert(predicate, message);

export function createDataConverter(onContentChange?: OnContentChangeFunction): EditorDataInstance {
  let currContent: RicosContent = emptyState;
  let currEditorState: EditorState = createEmpty();
  let prevState: ContentState = currEditorState.getCurrentContent();
  let isUpdated = false;
  const getContentState = () => {
    const currState: ContentState = currEditorState.getCurrentContent();
    if (!isUpdated) {
      currContent = convertToRaw(currState);
      isUpdated = true;
    }
    if (currState !== prevState) {
      onContentChange?.(currContent);
      prevState = currState;
    }
    return currContent;
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
