import { cloneDeep } from 'lodash';
import { RicosEntityMap, RicosContent, RicosContentBlock } from 'wix-rich-content-common';
const galleryType = 'wix-draft-plugin-gallery';

const removeEntitiesWithErrors = (entityMap: RicosEntityMap): RicosEntityMap => {
  const newEntityMap: RicosEntityMap = cloneDeep(entityMap);
  Object.keys(entityMap).forEach((key: string | number): void => {
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

const isErroredBlock = (block: RicosContentBlock, entityMap: RicosEntityMap): boolean => {
  const { entityRanges = [], type } = block;
  return type === 'atomic' && entityMap[entityRanges[0]?.key].data?.error;
};

export default function errorBlocksRemover(contentState: RicosContent): RicosContent {
  const { entityMap } = contentState;
  const newBlocks: RicosContentBlock[] = contentState.blocks.filter(
    (block: RicosContentBlock) => !isErroredBlock(block, entityMap)
  );
  return {
    ...contentState,
    blocks: newBlocks,
    entityMap: removeEntitiesWithErrors(entityMap),
  };
}
