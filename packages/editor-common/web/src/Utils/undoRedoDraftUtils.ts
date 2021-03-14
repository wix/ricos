import { EditorState, ContentState, convertToRaw } from '../index';
import { isEqual } from 'lodash';

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

export function preserveSelection(editorState: EditorState, newEditorState: EditorState) {
  return EditorState.forceSelection(
    newEditorState,
    editorState.getCurrentContent().getSelectionBefore()
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

export function getBlocksEntity(blockKey, contentState) {
  const entityKey = contentState.getBlockForKey(blockKey)?.getEntityAt(0);
  return contentState.getEntity(entityKey);
}

function fixDraftUndoStackBug(block) {
  if (block.type === 'atomic') {
    block.text = ' ';
  }
  return block;
}

export function compareContentBlocks(contentState: ContentState, newContentState: ContentState) {
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

export function doesEntityExistInBothStates(block, contentState, newContentState) {
  const currentEntity = block.getEntityAt(0) && contentState.getEntity(block.getEntityAt(0));
  const newEntityKey = newContentState.getBlockForKey(block.key)?.getEntityAt(0);
  return currentEntity && newEntityKey && newContentState.getEntity(newEntityKey);
}
