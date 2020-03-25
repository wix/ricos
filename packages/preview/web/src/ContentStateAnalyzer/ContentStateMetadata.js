import extractEntityData from './extractEntityData';
import { METHOD_BLOCK_MAP, METHOD_GROUPED_BLOCK_MAP } from '../const';

const extractTextFromBlocks = (
  { blocks },
  blockFilter,
  textReducer = (text, block) => text + block.text,
  initValue = ''
) =>
  blocks.filter(blockFilter).reduce((text, block, index) => {
    const newText = textReducer(text, block, index);
    return newText;
  }, initValue);

const extractTextAsArray = (raw, blockTypeFilter) =>
  extractTextFromBlocks(
    raw,
    ({ type, text }) => blockTypeFilter(type) && text.length > 0,
    (text, block) => {
      text.push(block.text);
      return text;
    },
    []
  );

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
  const metadata = { allText: extractTextAsArray(raw, type => type !== 'atomic') };

  // non-grouped block text API
  Object.entries(METHOD_BLOCK_MAP).forEach(([func, blockType]) => {
    metadata[func] = extractTextAsArray(raw, type => type === blockType);
  });

  // grouped block text API
  Object.entries(METHOD_GROUPED_BLOCK_MAP).forEach(([func, blockType]) => {
    metadata[func] = extractSequentialBlockArrays(raw, blockType)
      .map(blockArray => extractTextAsArray({ blocks: blockArray }, type => type === blockType))
      .filter(arr => arr.length > 0);
  });

  const media = extractMedia(raw);
  metadata.images = media.filter(({ type }) => type === 'image');
  metadata.videos = media.filter(({ type }) => type === 'video');
  metadata.files = media.filter(({ type }) => type === 'file');
  metadata.maps = media.filter(({ type }) => type === 'map');
  metadata.links = media.filter(({ type }) => type === 'link');

  return metadata;
};

export default getContentStateMetadata;
