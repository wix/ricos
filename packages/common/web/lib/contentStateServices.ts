import { RicosContent, RicosContentBlock } from '../src';

export const truncateContentState = (
  contentState: RicosContent,
  index: number,
  opts: { wordsCount?: number; maxPlugins?: number } = {}
) => {
  const { blocks, entityMap } = contentState;
  const { wordsCount = Infinity, maxPlugins = Infinity } = opts;
  if (index < 0 || (index > blocks.length && wordsCount === Infinity && maxPlugins === Infinity)) {
    return contentState;
  }

  const newEntityMap = {};

  const BreakException = {};

  const newBlocks: RicosContentBlock[] = [];
  let cWordCount = 0;
  let pluginsCount = 0;
  try {
    blocks.forEach((block, i) => {
      if (i === index) throw BreakException;
      const blockWords = block.text.split(' ').filter(x => x !== ' ');

      if (block.type === 'atomic') {
        pluginsCount++;
      }

      console.log({ pluginsCount, maxPlugins });
      if (pluginsCount > maxPlugins) {
        console.log('breaking!', newBlocks);
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
  }

  return { ...contentState, blocks: newBlocks, entityMap: newEntityMap };
};
