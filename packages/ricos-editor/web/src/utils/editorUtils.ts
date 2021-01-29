import {
  createWithContent,
  createEmpty,
  convertToRaw,
  convertFromRaw,
} from 'wix-rich-content-editor/libs/editorStateConversion';
import { EditorProps } from 'draft-js';
import { debounce, pick } from 'lodash';
import { emptyState, DRAFT_EDITOR_PROPS } from 'ricos-common';
import { compare, isContentStateEmpty } from 'ricos-content';
import { RicosContent, isSSR } from 'wix-rich-content-common';
import { EditorDataInstance, OnContentChangeFunction, ContentStateGetter } from '../index';
import errorBlocksRemover from './errorBlocksRemover';

/* eslint-disable no-console */
export const assert = (predicate, message) => console.assert(predicate, message);

export const ONCHANGE_DEBOUNCE_TIME = 200;

const wait = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export function createDataConverter(
  onContentChange?: OnContentChangeFunction,
  initialContent?: RicosContent
): EditorDataInstance {
  let currContent = initialContent || emptyState;
  let currEditorState = initialContent
    ? createWithContent(convertFromRaw(initialContent))
    : createEmpty();
  let currTraits = {
    isEmpty: initialContent ? isContentStateEmpty(initialContent) : true,
    contentChanges: { blockChanges: {}, entityChanges: {} },
  };
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

  const getContentTraits = () => {
    if (!initialContent) {
      return currTraits;
    }
    if (!isUpdated) {
      const currState = currEditorState.getCurrentContent();
      currContent = convertToRaw(currState);
      const blockChanges = compare(currContent.blocks, initialContent.blocks);
      const entityChanges = compare(currContent.entityMap, initialContent.entityMap);
      currTraits = {
        isEmpty: isContentStateEmpty(currContent),
        contentChanges: { blockChanges, entityChanges },
      };
      isUpdated = true;
    }
    return currTraits;
  };

  const getContentState: ContentStateGetter = ({ shouldRemoveErrorBlocks = true } = {}) => {
    if (!isUpdated) {
      const currState = currEditorState.getCurrentContent();
      currContent = convertToRaw(currState);
      if (initialContent) {
        const blockChanges = compare(currContent.blocks, initialContent.blocks);
        const entityChanges = compare(currContent.entityMap, initialContent.entityMap);
        currTraits = {
          isEmpty: isContentStateEmpty(currContent),
          contentChanges: { blockChanges, entityChanges },
        };
      }
      isUpdated = true;
    }

    onContentChange?.(currContent);

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
    getContentTraits,
    getEditorState,
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

export const filterDraftEditorSettings = (draftEditorSettings: Partial<EditorProps>) =>
  pick(draftEditorSettings, DRAFT_EDITOR_PROPS);
