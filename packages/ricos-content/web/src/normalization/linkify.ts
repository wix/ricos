import { getUrlMatches } from '../urlValidators';
import { RicosContent } from '../types';

export const linkify = (contentState: RicosContent, { anchorTarget, relValue }) => {
  let lastKey =
    Object.keys(contentState.entityMap).length > 0
      ? Math.max(...Object.keys(contentState.entityMap).map(key => parseInt(key, 10))) + 1
      : 0;
  return contentState.blocks.reduce(
    (state, block) => {
      const { text } = block;
      const linkEntries = getUrlMatches(text)
        .filter(({ text: url, index: start, lastIndex: end }) => {
          const alreadyHasEntity = hasEntityInRange(block, start, end);
          const longEnough = url.length >= 6;
          return !alreadyHasEntity && longEnough;
        })
        .map(({ text: url, index: start, lastIndex: end }, idx) => {
          lastKey += idx;
          return createEntity(lastKey, url, start, end, anchorTarget, relValue);
        });
      return {
        blocks: [
          ...state.blocks,
          {
            ...block,
            entityRanges: [
              ...block.entityRanges,
              ...linkEntries.map(({ entityRange }) => entityRange),
            ],
          },
        ],
        entityMap: {
          ...linkEntries.reduce(
            (entityMap, { mapEntry }) => ({ ...entityMap, ...mapEntry }),
            state.entityMap
          ),
        },
      };
    },
    { blocks: [], entityMap: { ...contentState.entityMap } }
  );
};

const hasEntityInRange = (block, start, end) =>
  block.entityRanges.some(({ offset, length }) => start < offset + length && end >= offset);

const createEntity = (entityKey, url, start, end, anchorTarget, relValue) => {
  const entityRange = {
    offset: start,
    length: end - start,
    key: entityKey,
  };

  const mapEntry = {
    [entityKey]: {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url,
        target: anchorTarget || '_blank',
        rel: relValue || 'noopener',
      },
    },
  };

  return { entityRange, mapEntry };
};
