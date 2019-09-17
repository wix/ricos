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

  return blockArrayResult.list;
};

const getContentStateMetadata = raw => {
  const text = () => extractTextFromBlocks(raw, ({ type }) => type !== 'atomic');
  text.array = () => extractTextAsArray(raw, type => type !== 'atomic');

  // non-grouped block text API
  Object.entries({
    plain: 'unstyled',
    h2: 'header-two',
    h3: 'header-three',
    h4: 'header-four',
    h5: 'header-five',
    h6: 'header-six',
    quote: 'blockquote',
  }).forEach(([func, blockType]) => {
    text[func] = () => extractTextFromBlocks(raw, ({ type }) => type === blockType);
    text[func].array = () => extractTextAsArray(raw, type => type === blockType);
  });

  // grouped block text API
  Object.entries({
    code: 'code-block',
    ol: 'ordered-list-item',
    ul: 'unordered-list-item',
  }).forEach(([func, blockType]) => {
    text[func] = () =>
      extractSequentialBlockArrays(raw, blockType).map(blockArray =>
        extractTextFromBlocks({ blocks: blockArray }, ({ type }) => type === blockType)
      );
    text[func].array = () =>
      extractSequentialBlockArrays(raw, blockType).map(blockArray =>
        extractTextAsArray({ blocks: blockArray }, type => type === blockType)
      );
  });

  return { text };
};

export default getContentStateMetadata;
