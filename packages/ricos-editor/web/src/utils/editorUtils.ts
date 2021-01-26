import { createEmpty, convertToRaw } from 'wix-rich-content-editor/libs/editorStateConversion';
import { ContentState, EditorProps } from 'draft-js';
import { debounce, pick } from 'lodash';
import { emptyState, DRAFT_EDITOR_PROPS } from 'ricos-common';
import { isSSR, RicosContent } from 'wix-rich-content-common';
import {
  EditorDataInstance,
  OnContentChangeFunction,
  ContentStateGetter,
  OnRicosContentChangeFunction,
} from '../index';
import errorBlocksRemover from './errorBlocksRemover';
import { fromDraft } from 'ricos-content/libs/migrateSchema';

/* eslint-disable no-console */
export const assert = (predicate, message) => console.assert(predicate, message);

export const ONCHANGE_DEBOUNCE_TIME = 200;

const wait = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export function createDataConverter(
  onContentChange?: OnContentChangeFunction,
  onRicosContentChange?: OnRicosContentChangeFunction
): EditorDataInstance {
  let currContent: RicosContent = emptyState;
  let currEditorState = createEmpty();
  let currentTraits = { isEmpty: true, isContentChanged: false };
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

  const getEditorState = () => currEditorState;

  const getContentState: ContentStateGetter = ({ shouldRemoveErrorBlocks = true } = {}) => {
    const currState: ContentState = currEditorState.getCurrentContent();
    if (!isUpdated) {
      currContent = convertToRaw(currState);
      isUpdated = true;
    }

    if (onRicosContentChange && 'blocks' in currContent) {
      onRicosContentChange?.(fromDraft(currContent), currentTraits);
    } else {
      onContentChange?.(currContent, currentTraits);
    }

    if (waitingForUpdateResolve) {
      waitingForUpdateResolve();
      waitingForUpdateResolve = false;
      waitingForUpdatePromise = Promise.resolve();
    }
    return shouldRemoveErrorBlocks ? errorBlocksRemover(currContent) : currContent;
  };
  const debounceUpdate = debounce(getContentState, ONCHANGE_DEBOUNCE_TIME);
  return {
    getContentState,
    getEditorState,
    waitForUpdate,
    getContentStatePromise,
    refresh: (editorState, contentTraits) => {
      if (!isSSR()) {
        isUpdated = false;
        currEditorState = editorState;
        currentTraits = contentTraits;
        debounceUpdate();
      }
    },
  };
}

export const filterDraftEditorSettings = (draftEditorSettings: Partial<EditorProps>) =>
  pick(draftEditorSettings, DRAFT_EDITOR_PROPS);
