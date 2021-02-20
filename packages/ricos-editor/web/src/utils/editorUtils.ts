import {
  createWithContent,
  createEmpty,
  convertToRaw,
  convertFromRaw,
} from 'wix-rich-content-editor/libs/editorStateConversion';
import { EditorProps } from 'draft-js';
import { debounce, pick, sortBy, isEqual, isEmpty } from 'lodash';
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

// compares ranges regardless style order, e.g. ['BOLD', 'ITALIC'] equals ['ITALIC', 'BOLD']
function areRangesEqual(blockRanges1, blockRanges2, sortKey) {
  return (
    blockRanges1.length === blockRanges2.length &&
    isEqual(
      sortBy(blockRanges1, r => r[sortKey]),
      sortBy(blockRanges2, r => r[sortKey])
    )
  );
}

function isTextAlignmentEqual(block1, block2) {
  const isBlock1AlignedLeft = !block1.data.textAlignment || block1.data.textAlignment === 'left';
  const isBlock2AlignedLeft = !block2.data.textAlignment || block2.data.textAlignment === 'left';
  return (
    isBlock1AlignedLeft === isBlock2AlignedLeft ||
    block1.data.textAlignment === block2.data.textAlignment
  );
}

function areBlockFieldsEqual(block1, block2) {
  return (
    block1.text === block2.text &&
    block1.depth === block2.depth &&
    block1.type === block2.type &&
    areRangesEqual(block1.inlineStyleRanges, block2.inlineStyleRanges, 'style') &&
    areRangesEqual(block1.entityRanges, block2.entityRanges, 'key') &&
    isTextAlignmentEqual(block1, block2) &&
    isEmpty(compare(block1.data, block2.data, { verbose: false, ignoredKeys: ['textAlignment'] }))
  );
}

function areBlocksEqual(currentStateBlocks, initialStateBlocks) {
  return (
    currentStateBlocks.length === initialStateBlocks.length &&
    currentStateBlocks.every((block, i) => areBlockFieldsEqual(block, initialStateBlocks[i]))
  );
}

export function createDataConverter(
  onContentChange?: OnContentChangeFunction,
  initialContent?: RicosContent
): EditorDataInstance {
  let currContent = initialContent || emptyState;
  let lastContent = currContent;
  let currEditorState = initialContent
    ? createWithContent(convertFromRaw(initialContent))
    : createEmpty();
  let currTraits = {
    isEmpty: initialContent ? isContentStateEmpty(initialContent) : true,
    isContentChanged: false,
    isLastChangeEdit: false,
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

  const updateTraits = (
    currContent: RicosContent,
    lastContent: RicosContent,
    initialContent: RicosContent
  ) => {
    const initialBlocksEqual = areBlocksEqual(currContent.blocks, initialContent.blocks);
    const initialEntitiesEqual = isEmpty(
      compare(currContent.entityMap, initialContent.entityMap, { verbose: false })
    );
    const lastBlocksEqual = areBlocksEqual(currContent.blocks, lastContent.blocks);
    const lastEntitiesEqual = isEmpty(compare(currContent.entityMap, lastContent.entityMap));
    currTraits = {
      isEmpty: isContentStateEmpty(currContent),
      isContentChanged: !(initialBlocksEqual && initialEntitiesEqual),
      isLastChangeEdit: !(lastBlocksEqual && lastEntitiesEqual),
    };
  };

  const getContentTraits = () => {
    if (!initialContent) {
      return currTraits;
    }
    if (!isUpdated) {
      const currState = currEditorState.getCurrentContent();
      lastContent = currContent;
      currContent = convertToRaw(currState);
      console.assert(lastContent !== currContent, 'equal by ref!');
      updateTraits(currContent, lastContent, initialContent);
      isUpdated = true;
    }
    return currTraits;
  };

  const getContentState: ContentStateGetter = ({ shouldRemoveErrorBlocks = true } = {}) => {
    if (!isUpdated) {
      const currState = currEditorState.getCurrentContent();
      lastContent = currContent;
      currContent = convertToRaw(currState);
      console.assert(lastContent !== currContent, 'equal by ref!');
      if (initialContent) {
        updateTraits(currContent, lastContent, initialContent);
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
