import { EditorState, ContentState, convertToRaw } from '../index';
import { isEqual } from 'lodash';
import { ContentBlock } from '@wix/draft-js';

export function removeCompositionModeFromEditorState(editorState: EditorState) {
  if (editorState.isInCompositionMode()) {
    return EditorState.set(editorState, {
      inCompositionMode: false,
    });
  }
  return editorState;
}

export function removeFocus(editorState: EditorState) {
  return EditorState.set(editorState, {
    selection: editorState.getSelection().merge({ hasFocus: false }),
  });
}

export function setLastChangeType(editorState: EditorState, lastChangeType: string) {
  return EditorState.set(editorState, { lastChangeType });
}

export function preserveSelection(sourceEditorState: EditorState, targetEditorState: EditorState) {
  return EditorState.forceSelection(
    targetEditorState,
    sourceEditorState.getCurrentContent().getSelectionBefore()
  );
}

export function shiftRedoStack(editorState: EditorState) {
  return EditorState.set(editorState, { redoStack: editorState.getRedoStack().shift() });
}

export function pushToRedoStack(editorState: EditorState, contentState: ContentState) {
  return EditorState.set(editorState, { redoStack: editorState.getRedoStack().push(contentState) });
}

export function replaceComponentData(editorState: EditorState, blockKey: string, componentData) {
  const currentContent = editorState.getCurrentContent();
  const entityKey = currentContent
    .getBlockMap()
    .get(blockKey)
    .getEntityAt(0);
  currentContent.replaceEntityData(entityKey, componentData);
}

export function getBlocksEntityTypeAndData(blockKey, contentState) {
  const entityKey = contentState.getBlockForKey(blockKey)?.getEntityAt(0);
  const entity = contentState.getEntity(entityKey);
  return { type: entity.getType(), data: entity.getData() };
}

function fixDraftUndoStackBug(block) {
  if (block.type === 'atomic') {
    block.text = ' ';
  }
  return block;
}

export function didBlocksChange(contentState: ContentState, newContentState: ContentState) {
  const { blocks: currentBlocks } = convertToRaw(contentState);
  const newBlocks = {};
  convertToRaw(newContentState).blocks.forEach(block => {
    newBlocks[block.key] = fixDraftUndoStackBug(block);
  });
  if (currentBlocks.length !== Object.keys(newBlocks).length) {
    return true;
  }
  return currentBlocks.some(block => {
    const newBlock = newBlocks[block.key];
    return !newBlock || !isEqual(block, newBlock);
  });
}

export function doesEntityExistInBoth(block: ContentBlock, newContentState: ContentState) {
  const currentEntityKey = block.getEntityAt(0);
  const newEntityKey = newContentState.getBlockForKey(block.getKey())?.getEntityAt(0);
  return !!(block.getType() === 'atomic' && currentEntityKey && newEntityKey);
}
