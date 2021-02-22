import { RicosContent, RicosContentBlock } from '../src';

export const truncateContent = (
  contentState: RicosContent,
  index: number,
  opts: { wordsCount?: number; maxPlugins?: number } = {}
): { content: RicosContent; isTruncated: boolean } => {
  const { blocks, entityMap } = contentState;
  const { wordsCount = Infinity, maxPlugins = Infinity } = opts;
  if (index < 0 || (index > blocks.length && wordsCount === Infinity && maxPlugins === Infinity)) {
    return { content: contentState, isTruncated: false };
  }

  const newEntityMap = {};

  const BreakException = {};

  const newBlocks: RicosContentBlock[] = [];
  let cWordCount = 0;
  let pluginsCount = 0;
  let isTruncated = false;
  try {
    blocks.forEach((block, i) => {
      if (i === index) throw BreakException;
      const blockWords = block.text.split(' ').filter(x => x !== ' ');

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

  const content = { ...contentState, blocks: newBlocks, entityMap: newEntityMap };
  return { content, isTruncated };
};

export const truncateContentState = (
  contentState: RicosContent,
  index: number,
  opts: { wordsCount?: number; maxPlugins?: number } = {}
) => {
  const { content } = truncateContent(contentState, index, opts);
  return content;
};
