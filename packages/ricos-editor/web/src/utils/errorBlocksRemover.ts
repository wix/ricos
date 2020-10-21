import { cloneDeep } from 'lodash';
import { RicosEntityMap, RicosContent, RicosContentBlock } from 'wix-rich-content-common';
const galleryType = 'wix-draft-plugin-gallery';

const modifyEntityMap = (entityMap: RicosEntityMap): RicosEntityMap => {
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

const isErroredBlock = (
  entityMap: RicosEntityMap,
  entityKey: string | number,
  type: string
): boolean => type === 'atomic' && entityMap[entityKey].data?.error;

export default function errorBlocksRemover(contentState: RicosContent): RicosContent {
  const { entityMap } = contentState;
  const newBlocks: RicosContentBlock[] = contentState.blocks.filter(
    (block: RicosContentBlock): boolean => {
      const { entityRanges = [], type } = block;
      return !isErroredBlock(entityMap, entityRanges[0]?.key, type);
    }
  );
  return {
    ...contentState,
    blocks: newBlocks,
    entityMap: modifyEntityMap(entityMap),
  };
}
