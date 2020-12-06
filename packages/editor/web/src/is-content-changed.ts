import { EntityInstance, ContentBlock, EditorState } from 'draft-js';
import { getEntities } from 'wix-rich-content-editor-common';
import { isEqual } from 'lodash';

// TODO: once the plugin data changes are available on the undo stack, it can be used to detect content changes
// comparison order is important for performance:
// 1. block numbers
// 2. block contents
// 3. entity numbers
// 4. entity content
export function isContentChanged(
  editorState: EditorState,
  initialEditorState: { entities: EntityInstance[]; blocks: ContentBlock[] }
) {
  const { entities, blocks } = initialEditorState;
  const contentState = editorState.getCurrentContent();
  const currentBlocks = contentState.getBlocksAsArray();
  if (currentBlocks.length !== blocks.length) {
    return true;
  }
  if (currentBlocks.some((block, index) => !areBlocksEqual(block, blocks[index]))) {
    return true;
  }
  const currentEntities = getEntities(editorState);
  if (currentEntities.length !== entities.length) {
    return true;
  }
  return currentEntities.some((entity, index) => !areEntitiesEqual(entity, entities[index]));
}

function areBlocksEqual(block1, block2) {
  return (
    block1.getType() === block2.getType() &&
    block1.getLength() === block2.getLength() &&
    block1.getText() === block2.getText() &&
    block1.getDepth() === block2.getDepth() &&
    isEqual(block1.getData(), block2.getData()) &&
    block1.getCharacterList().equals(block2.getCharacterList())
  );
}

function areEntitiesEqual(entity1, entity2) {
  return entity1.getType() === entity2.getType() && isEqual(entity1.getData(), entity2.getData());
}
