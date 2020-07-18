import extractEntityData from './extractEntityData';
import { METHOD_BLOCK_MAP, METHOD_GROUPED_BLOCK_MAP } from '../const';
import { merge, cloneDeep, groupBy } from 'lodash';
import { isImage } from '../ContentStateBuilder/galleryItemsConverter';

const extractTextBlocksWithEntities = (blocks, entityMap, blockFilter) =>
  blocks.filter(blockFilter).reduce((texts, block) => {
    const { entityRanges } = block;
    const entities = entityRanges.reduce((map, range) => {
      const _key = `_${range.key}`;
      map[_key] = entityMap[range.key];
      return map;
    }, {});
    const _block = {
      ...block,
      entityRanges: block.entityRanges.map(range => ({ ...range, key: `_${range.key}` })),
    };
    texts.push({ block: _block, entities });
    return texts;
  }, []);

const extractTextBlockArray = ({ blocks, entityMap }, blockTypeFilter) =>
  extractTextBlocksWithEntities(
    blocks,
    entityMap,
    ({ type, text }) => blockTypeFilter(type) && text.length > 0
  );

const extractBatchesByType = ({ blocks, entityMap }, blockTypeFilter) => {
  let current = 0,
    next = 0;
  const batches = groupBy(blocks, block => {
    const isValid = blockTypeFilter(block.type);
    if (isValid) {
      if (current === next) next++;
    } else if (current < next) current++;
    return isValid && current;
  });

  const batchesWithEntities = Object.entries(batches)
    .filter(value => value[0] !== 'false')
    .map(batch =>
      extractTextBlocksWithEntities(
        batch[1],
        entityMap,
        ({ type, text }) => blockTypeFilter(type) && text.length > 0
      )
    )
    .filter(batch => batch.length > 0);
  return batchesWithEntities;
};

const createTextFragments = raw =>
  extractBatchesByType(raw, type => type !== 'atomic').map(batch => {
    if (!batch.length || batch.length === 0) return [];
    const textCombined = batch.map(entry => entry.block.text).join(' \n');
    const copyBlocks = cloneDeep(batch);
    let offset = 0;
    copyBlocks.forEach(entry => {
      entry.block.inlineStyleRanges.map(style => (style.offset += offset));
      entry.block.entityRanges.map(entity => (entity.offset += offset));
      offset += entry.block.text.length + 2;
    });
    const inlineStyleRanges = copyBlocks.flatMap(entry => entry.block.inlineStyleRanges);
    const entityRanges = copyBlocks.flatMap(entry => entry.block.entityRanges);

    const entities = merge(copyBlocks.map(block => block.entities)).reduce((acc, curr) => ({
      ...acc,
      ...curr,
    }));
    return merge(cloneDeep(batch[0]), {
      block: { text: textCombined, inlineStyleRanges, entityRanges },
      entities,
    });
  });

// extracts an array of same-type sequential block text arrays:
// [ {li1}, {li2}, {plain}, {quote}, {li1}, {li2}, {li3} ] =>
// [
//  [{li1}, {li2}],
//  [{li1}, {li2}, {li3}]
// ]
// useful for list and code fragments extraction
const extractSequentialBlockArrays = ({ blocks }, blockType) => {
  const blockArrayResult = blocks.reduce(
    (result, block, idx) => {
      if (block.type === blockType) {
        if (result.lastItemIndex === -1) {
          result.list.push([]);
        }
        result.lastItemIndex = idx;
        result.list[result.list.length - 1].push(block);
      } else {
        result.lastItemIndex = -1;
      }
      return result;
    },
    { list: [], lastItemIndex: -1 }
  );

  return blockArrayResult.list.filter(arr => arr.length > 0);
};

const extractMedia = ({ entityMap }) =>
  Object.values(entityMap).reduce((media, entity) => [...media, ...extractEntityData(entity)], []);

const getContentStateMetadata = raw => {
  const metadata = {
    allText: extractTextBlockArray(raw, type => type !== 'atomic'),
    textFragments: createTextFragments(raw),
  };

  // non-grouped block text API
  Object.entries(METHOD_BLOCK_MAP).forEach(([func, blockType]) => {
    metadata[func] = extractTextBlockArray(raw, type => type === blockType);
  });

  // grouped block text API
  Object.entries(METHOD_GROUPED_BLOCK_MAP).forEach(([func, blockType]) => {
    metadata[func] = extractSequentialBlockArrays(raw, blockType)
      .map(blockArray =>
        extractTextBlockArray(
          { blocks: blockArray, entityMap: raw.entityMap },
          type => type === blockType
        )
      )
      .filter(arr => arr.length > 0);
  });

  const media = extractMedia(raw);
  metadata.galleryItems = media.filter(({ type }) => isImage(type) || type === 'video');
  metadata.images = media.filter(({ type }) => isImage(type));
  metadata.videos = media.filter(({ type }) => type === 'video');
  metadata.files = media.filter(({ type }) => type === 'file');
  metadata.maps = media.filter(({ type }) => type === 'map');
  metadata.links = media.filter(({ type }) => type === 'link');

  return metadata;
};

export default getContentStateMetadata;
