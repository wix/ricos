import { RicosContentBlock, RicosContent, RicosEntityRange } from '../types';

export const hasLinksInBlock = (block: RicosContentBlock, contentState: RicosContent) => {
  return getLinkRangesInBlock(block, contentState).length > 0;
};

export const getLinkRangesInBlock = (block: RicosContentBlock, contentState: RicosContent) => {
  const ranges: [number, number][] = [];
  block.entityRanges.forEach((entityRange: RicosEntityRange) => {
    const entityType = contentState.entityMap[entityRange.key]?.type;
    if (entityType === 'LINK' || entityType === 'wix-draft-plugin-external-link') {
      const start = entityRange.offset;
      const end = start + entityRange.length;
      ranges.push([start, end]);
    }
  });
  return ranges;
};
