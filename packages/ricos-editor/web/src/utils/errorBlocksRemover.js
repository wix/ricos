import { cloneDeep } from 'lodash';

const galleryType = 'wix-draft-plugin-gallery';

const modifyEntityMap = entityMap => {
  const newEntityMap = cloneDeep(entityMap);
  Object.keys(entityMap).forEach(key => {
    const { data, type: entityType } = entityMap[key] || {};
    if (entityType === galleryType) {
      const items = data.items.filter(item => !item.error);
      newEntityMap[key].data.items = items;
    } else if (data.error) {
      // eslint-disable-next-line fp/no-delete
      delete newEntityMap[key];
    }
  });
  return newEntityMap;
};

const isErroredBlock = (entityMap, entityKey, type) =>
  type === 'atomic' && entityMap[entityKey].data?.error;

export default function errorBlockRemover(contentState) {
  const { entityMap } = contentState;
  const newBlocks = contentState.blocks.filter(block => {
    const { entityRanges = [], type } = block;
    return !isErroredBlock(entityMap, entityRanges[0]?.key, type);
  });
  return {
    ...contentState,
    blocks: newBlocks,
    entityMap: modifyEntityMap(entityMap),
  };
}
