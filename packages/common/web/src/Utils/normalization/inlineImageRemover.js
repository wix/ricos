const imagesTypes = ['wix-draft-plugin-image', 'IMAGE'];

const filterRangesByType = (entityRanges, entityMap, entitiesToRemove) => {
  return entityRanges.filter(entityRange => {
    const { key } = entityRange;
    const { type: entityType } = entityMap[key] || {};
    return entitiesToRemove.indexOf(entityType) === -1;
  });
};

const filterImageFromRanegs = (entityRanges, entityMap) => {
  return filterRangesByType(entityRanges, entityMap, imagesTypes);
};

export default contentState => {
  const newBlocks = contentState.blocks.map(block => {
    const { entityRanges = [], type } = block;

    const filteredRanges =
      type === 'atomic'
        ? entityRanges
        : filterImageFromRanegs(entityRanges, contentState.entityMap);

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
