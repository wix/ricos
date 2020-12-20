import { RicosContent } from '../src';

export const truncateContentState = (contentState: RicosContent, index: number) => {
  if (index < 0 || index > contentState.blocks.length) {
    return contentState;
  }
  const newEntityMap = {};
  const newBlocks = [...contentState.blocks.slice(0, index)];
  newBlocks.forEach(block => {
    block.entityRanges.forEach(entity => {
      newEntityMap[entity.key] = contentState.entityMap[entity.key];
    });
  });
  return { ...contentState, blocks: newBlocks, entityMap: newEntityMap };
};
