import { DraftContent, RicosContentBlock, RicosEntityMap } from '..';

export const truncateContent = (
  content: DraftContent, // The content to truncate
  limits: {
    blocksCount?: number; // Limit on number of blocks
    wordsCount?: number; // Limit on number of words
    maxPlugins?: number; // Limit on number of plugin blocks
  } = {}
): { content: DraftContent; isTruncated: boolean } => {
  const { blocks, entityMap } = content;
  const { wordsCount = Infinity, maxPlugins = Infinity, blocksCount = Infinity } = limits;
  if (
    blocksCount < 0 ||
    (blocksCount > blocks.length && wordsCount === Infinity && maxPlugins === Infinity)
  ) {
    return { content, isTruncated: false };
  }

  const newEntityMap: RicosEntityMap = {};

  const BreakException = {};

  const newBlocks: RicosContentBlock[] = [];
  let cWordCount = 0;
  let pluginsCount = 0;
  let isTruncated = false;
  try {
    blocks.forEach((block, i) => {
      if (i === blocksCount) throw BreakException;
      const blockWords = block.text.split(' ').filter(x => x !== '');

      if (block.type === 'atomic') {
        pluginsCount++;
      }

      if (pluginsCount > maxPlugins) {
        throw BreakException;
      }
      if (cWordCount + blockWords.length > wordsCount) {
        newBlocks.push({
          ...block,
          text: blockWords.slice(0, wordsCount - cWordCount).join(' ') + '...',
        });
      } else {
        newBlocks.push(block);
      }
      cWordCount += blockWords.length;

      block.entityRanges.forEach(entity => {
        newEntityMap[entity.key] = entityMap[entity.key];
      });
      // get word count in block
      if (cWordCount >= wordsCount) throw BreakException;
    });
  } catch (e) {
    if (e !== BreakException) throw e;
    isTruncated = true;
  }

  const truncatedContent = { ...content, blocks: newBlocks, entityMap: newEntityMap };
  return { content: truncatedContent, isTruncated };
};
