import { createEmpty, convertToRaw } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import { EditorState, ContentState } from 'draft-js';
import { debounce } from 'lodash';
import { emptyState } from 'ricos-common';
import { isSSR } from 'wix-rich-content-common';
import { RicosContent, EditorDataInstance, OnContentChangeFunction } from '../index';

/* eslint-disable no-console */
export const assert = (predicate, message) => console.assert(predicate, message);

const wait = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export function createDataConverter(onContentChange?: OnContentChangeFunction): EditorDataInstance {
  let currContent: RicosContent = emptyState;
  let currEditorState: EditorState = createEmpty();
  let prevState: ContentState = currEditorState.getCurrentContent();
  let isUpdated = false;
  let waitingForUpdatePromise = Promise.resolve(),
    waitingForUpdateResolve;

  const getContentStatePromise = async () => {
    await Promise.race([wait(2000), waitingForUpdatePromise]);
    return getContentState();
  };

  const waitForUpdate = () => {
    waitingForUpdatePromise = new Promise(res => {
      waitingForUpdateResolve = res;
    });
  };

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

    if (waitingForUpdateResolve) {
      waitingForUpdateResolve();
      waitingForUpdateResolve = false;
      waitingForUpdatePromise = Promise.resolve();
    }
    return currContent;
  };
  const debounceUpdate = debounce(getContentState, 200);
  return {
    getContentState,
    waitForUpdate,
    getContentStatePromise,
    refresh: editorState => {
      if (!isSSR()) {
        isUpdated = false;
        currEditorState = editorState;
        debounceUpdate();
      }
    },
  };
}
