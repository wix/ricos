import {
  RicosEntityMap,
  DraftContent,
  RicosContentBlock,
  GALLERY_TYPE,
  COLLAPSIBLE_LIST_TYPE,
  TABLE_TYPE,
} from 'wix-rich-content-common';
import { cloneDeepWithoutEditorState } from 'wix-rich-content-editor-common';

const getTableRowColumns = row => {
  Object.keys(row.columns).forEach(columnKey => {
    const column = row.columns[columnKey].content;
    row.columns[columnKey].content = errorBlocksRemover(column);
  });
  return row;
};

const complexPluginHandlers = {
  [GALLERY_TYPE]: (prevData, newData) => {
    const items = prevData.items.filter(item => !item.error);
    newData.items = items;
    return newData;
  },
  [COLLAPSIBLE_LIST_TYPE]: (_, newData) => {
    newData.pairs.forEach(pair => {
      pair.title = errorBlocksRemover(pair.title);
      pair.content = errorBlocksRemover(pair.content);
    });
    return newData;
  },
  [TABLE_TYPE]: (prevData, newData) => {
    Object.keys(prevData.config.rows).forEach(rowKey => {
      const row = prevData.config.rows[rowKey];
      newData.config.rows[rowKey] = getTableRowColumns(row);
    });
    return newData;
  },
};

const removeEntitiesWithErrors = (entityMap: RicosEntityMap): RicosEntityMap => {
  const newEntityMap: RicosEntityMap = cloneDeepWithoutEditorState(entityMap);
  Object.keys(entityMap).forEach((entityKey: string | number): void => {
    const { data, type: entityType } = entityMap[entityKey] || {};
    const newData = complexPluginHandlers[entityType]?.(data, newEntityMap[entityKey].data);
    if (newData) {
      newEntityMap[entityKey].data = newData;
    } else if (data?.error) {
      // eslint-disable-next-line fp/no-delete
      delete newEntityMap[entityKey];
    }
  });
  return newEntityMap;
};

const isErroredBlock = (block: RicosContentBlock, entityMap: RicosEntityMap): boolean => {
  const { entityRanges = [], type } = block;
  const entityKey = entityRanges[0]?.key;
  const { data } = entityMap[entityKey] || {};
  return type === 'atomic' && !!data?.error;
};

export default function errorBlocksRemover(contentState: DraftContent): DraftContent {
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
