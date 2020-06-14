const imagesTypes = ['wix-draft-plugin-image', 'IMAGE'];
const invalidInlineTypes = [
  ...imagesTypes,
  'wix-draft-plugin-gallery',
  'wix-draft-plugin-html',
  'wix-draft-plugin-video',
  'wix-draft-plugin-giphy',
  'wix-draft-plugin-file-upload',
];

const filterRangesByType = (entityRanges, entityMap, entitiesToRemove) => {
  return entityRanges.filter(entityRange => {
    const { key } = entityRange;
    const { type: entityType } = entityMap[key] || {};
    return entitiesToRemove.indexOf(entityType) === -1;
  });
};

export default ({ imagesOnly = false } = {}) => contentState => {
  const newBlocks = contentState.blocks.map(block => {
    const { entityRanges = [], type } = block;
    const isAtomic = type === 'atomic';

    let filteredRanges = entityRanges;
    if (!isAtomic) {
      filteredRanges = filterRangesByType(
        entityRanges,
        contentState.entityMap,
        imagesOnly ? imagesTypes : invalidInlineTypes
      );
    }

    return {
      ...block,
      entityRanges: filteredRanges,
    };
  });

  return {
    ...contentState,
    blocks: newBlocks,
  };
};
