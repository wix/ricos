import { EntityInstance, ContentBlock, EditorState } from 'draft-js';
import { getEntities } from 'wix-rich-content-editor-common';
import { isEqual } from 'lodash';

// TODO: once the plugin data changes are available on the undo stack, it can be used to detect content changes
export function isContentDirty(
  editorState: EditorState,
  initialEditorState: { text: string; entities: EntityInstance[]; blocks: ContentBlock[] }
) {
  const { entities, blocks } = initialEditorState;
  const contentState = editorState.getCurrentContent();
  const currentBlocks = contentState.getBlocksAsArray();
  if (currentBlocks.length !== blocks.length) {
    return true;
  }
  const currentEntities = getEntities(editorState);
  if (currentEntities.length !== entities.length) {
    return true;
  }
  const isDirty =
    currentBlocks.some((block, index) => !isEqual(block, blocks[index])) ||
    currentEntities.some((entity, index) => !isEqual(entity, entities[index]));
  return isDirty;
}

export function areBlocksEqual(block1, block2) {
  return (
    block1.getKey() !== block2.getKey() ||
    block1.getText() !== block2.getText() ||
    block1.getDepth() !== block2.getDepth() ||
    !isEqual(block1.getData(), block2.getData())
  );
}
