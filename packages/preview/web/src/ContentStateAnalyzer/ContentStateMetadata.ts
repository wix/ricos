import { ExposedBlocks, PreviewMetadata, ExposedGroupBlocks } from './../types';
import { RicosContent, RicosContentBlock, RicosEntity } from 'wix-rich-content-common';
import extractEntityData from './extractEntityData';
import { METHOD_BLOCK_MAP, METHOD_GROUPED_BLOCK_MAP } from '../const';
import { merge, cloneDeep, groupBy } from 'lodash';
import {
  BlockFilter,
  BlockTypeFilter,
  SequentialBlockArrays,
  TextBlockWithEntities,
} from './types';

const extractTextBlocksWithEntities = (
  blocks: RicosContent['blocks'],
  entityMap: RicosContent['entityMap'],
  blockFilter: BlockFilter
): TextBlockWithEntities[] =>
  blocks.filter(blockFilter).reduce((texts, block) => {
    const { entityRanges } = block;
    const entities = entityRanges.reduce((map, range) => {
      const _key = `_${range.key}`;
      map[_key] = entityMap[range.key];
      return map;
    }, {} as Record<string, RicosEntity>);
    const _block = {
      ...block,
      entityRanges: block.entityRanges.map(range => ({ ...range, key: `_${range.key}` })),
    };
    return [...texts, { block: _block, entities }];
  }, []);

const extractTextBlockArray = ({ blocks, entityMap }, blockTypeFilter: BlockTypeFilter) =>
  extractTextBlocksWithEntities(
    blocks,
    entityMap,
    ({ type, text }) => blockTypeFilter(type) && text.length > 0
  );

const extractBatchesByType = ({ blocks, entityMap }, blockTypeFilter: BlockTypeFilter) => {
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
        ({ type, text }: RicosContentBlock) => blockTypeFilter(type) && text.length > 0
      )
    )
    .filter(batch => batch.length > 0);
  return batchesWithEntities;
};

const createTextFragments = (raw: RicosContent) =>
  extractBatchesByType(raw, type => type !== 'atomic').map(batch => {
    if (!batch.length || batch.length === 0) return [];
    const splitter = ' \n';
    const textCombined = batch.map(entry => entry.block.text).join(splitter);
    const copyBlocks = cloneDeep(batch);
    let offset = 0;
    copyBlocks.forEach(entry => {
      entry.block.inlineStyleRanges.map(style => (style.offset += offset));
      entry.block.entityRanges.map(entity => (entity.offset += offset));
      offset += entry.block.text.length + splitter.length;
    });
    const inlineStyleRanges = copyBlocks.flatMap(entry => entry.block.inlineStyleRanges);
    const entityRanges = copyBlocks.flatMap(entry => entry.block.entityRanges);

    const entities = copyBlocks
      .map(block => block.entities)
      .reduce((acc, curr) => ({
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
const extractSequentialBlockArrays = ({ blocks }: RicosContent, blockType: string) => {
  const emptyAcc: SequentialBlockArrays = { list: [], lastItemIndex: -1 };
  const blockArrayResult = blocks.reduce((result, block, idx) => {
    if (block.type === blockType) {
      const list = result.lastItemIndex === -1 ? [...result.list, []] : result.list;
      list[list.length - 1] = [...list[list.length - 1], block];
      return {
        list,
        lastItemIndex: idx,
      };
    } else {
      return {
        list: result.list,
        lastItemIndex: -1,
      };
    }
  }, emptyAcc);
  return blockArrayResult.list.filter(arr => arr.length > 0);
};

const extractMedia = ({ entityMap }: RicosContent) =>
  Object.values(entityMap).reduce((media, entity) => [...media, ...extractEntityData(entity)], []);

const isMediaItem = (type: string) => ['image', 'video', 'giphy'].includes(type);

const countEntities = ({ entityMap }) => Object.values(entityMap).length;

const getContentStateMetadata = (raw: RicosContent) => {
  const mediaEntities = extractMedia(raw);
  const galleryItems = mediaEntities.filter(({ isGalleryItem }) => isGalleryItem);
  const singleMediaItems = mediaEntities.filter(
    ({ type, isGalleryItem }) => isMediaItem(type) && !isGalleryItem
  );
  const media: PreviewMetadata['media'] = {
    singleMediaItems,
    galleryItems,
    totalCount: galleryItems.length + singleMediaItems.length,
  };

  // non-grouped block text API
  const blocks: ExposedBlocks = Object.entries(METHOD_BLOCK_MAP).reduce(
    (prev, [func, blockType]) => ({
      ...prev,
      [func]: extractTextBlockArray(raw, type => type === blockType),
    }),
    {} as ExposedBlocks
  );

  // grouped block text API
  const groupedBlocks = Object.entries(METHOD_GROUPED_BLOCK_MAP).reduce(
    (prev, [func, blockType]) => ({
      ...prev,
      [func]: extractSequentialBlockArrays(raw, blockType)
        .map(blockArray =>
          extractTextBlockArray(
            { blocks: blockArray, entityMap: raw.entityMap },
            type => type === blockType
          )
        )
        .filter(arr => arr.length > 0),
    }),
    {} as ExposedGroupBlocks
  );

  const metadata: PreviewMetadata = {
    allText: extractTextBlockArray(raw, (type: string) => type !== 'atomic'),
    textFragments: createTextFragments(raw),
    media,
    images: mediaEntities.filter(({ type }) => type === 'image'),
    videos: mediaEntities.filter(({ type }) => type === 'video'),
    files: mediaEntities.filter(({ type }) => type === 'file'),
    maps: mediaEntities.filter(({ type }) => type === 'map'),
    links: mediaEntities.filter(({ type }) => type === 'link'),
    nonMediaPluginsCount: countEntities(raw) - media.totalCount,
    blocks,
    groupedBlocks,
  };

  return metadata;
};

export default getContentStateMetadata;
