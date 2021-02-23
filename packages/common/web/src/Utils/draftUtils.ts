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

export const removeFirstAndLastBlocks = (viewerWrapper: HTMLElement) => {
  const nodeListOfAllBlocks = viewerWrapper.querySelectorAll<HTMLElement>('[id^=viewer-]');
  if (nodeListOfAllBlocks.length < 3) {
    return;
  } else {
    const firstBlockNode = nodeListOfAllBlocks[0];
    const lastBlockNode = nodeListOfAllBlocks[nodeListOfAllBlocks.length - 1];
    if (firstBlockNode.textContent === '' || firstBlockNode.textContent === '​') {
      //zero-width space (empty table cell)
      const typeScriptIsShit = firstBlockNode.children[0] as HTMLElement;
      typeScriptIsShit.style.height = '1px';
    }
    if (lastBlockNode.textContent === '') {
      const typeScriptIsShit = lastBlockNode.children[0] as HTMLElement;
      typeScriptIsShit.style.height = '1px';
    }
  }
};
