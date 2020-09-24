const mediaUploadPlugins = [
  'wix-draft-plugin-image',
  'IMAGE',
  'wix-draft-plugin-video',
  'wix-draft-plugin-file-upload',
];
const galleryType = 'wix-draft-plugin-gallery';

const modifyEntityMap = (entityRanges, entityMap) => {
  const newEntityMap = entityMap;
  let shouldKeepBlock = true;
  entityRanges.forEach(entityRange => {
    const { key } = entityRange;
    const { data, type: entityType } = newEntityMap[key] || {};
    if (mediaUploadPlugins.indexOf(entityType) !== -1 && data.error) {
      // eslint-disable-next-line fp/no-delete
      delete newEntityMap[key];
      shouldKeepBlock = false;
    } else if (entityType === galleryType) {
      const items = data.items.filter(item => !item.error);
      newEntityMap[key].data.items = items;
    }
  });
  return { newEntityMap, shouldKeepBlock };
};

export default () => contentState => {
  let { entityMap } = contentState;
  const newBlocks = contentState.blocks.filter(block => {
    const { entityRanges = [], type } = block;
    const isAtomic = type === 'atomic';
    if (isAtomic) {
      const { newEntityMap, shouldKeepBlock } = modifyEntityMap(entityRanges, entityMap);
      entityMap = newEntityMap;
      return shouldKeepBlock;
    }
    return true;
  });
  return {
    ...contentState,
    blocks: newBlocks,
    entityMap,
  };
};
