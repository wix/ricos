const extractTextFromBlocks = (
  { blocks },
  blockFilter,
  textReducer = (text, block) => text + block.text,
  initValue = ''
) => {
  return blocks.filter(blockFilter).reduce((text, block, index) => {
    const newText = textReducer(text, block, index);
    return newText;
  }, initValue);
};

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

const getContentStateMetadata = raw => {
  const text = () => extractTextFromBlocks(raw, ({ type }) => type !== 'atomic');
  text.array = () => extractTextAsArray(raw, type => type !== 'atomic');

  text.plain = () => extractTextFromBlocks(raw, ({ type }) => type === 'unstyled');
  text.plain.array = () => extractTextAsArray(raw, type => type === 'unstyled');

  text.h2 = () => extractTextFromBlocks(raw, ({ type }) => type === 'header-two');
  text.h2.array = () => extractTextAsArray(raw, type => type === 'header-two');

  text.h3 = () => extractTextFromBlocks(raw, ({ type }) => type === 'header-three');
  text.h3.array = () => extractTextAsArray(raw, type => type === 'header-three');

  text.h4 = () => extractTextFromBlocks(raw, ({ type }) => type === 'header-four');
  text.h4.array = () => extractTextAsArray(raw, type => type === 'header-four');

  text.h5 = () => extractTextFromBlocks(raw, ({ type }) => type === 'header-five');
  text.h5.array = () => extractTextAsArray(raw, type => type === 'header-five');

  text.h6 = () => extractTextFromBlocks(raw, ({ type }) => type === 'header-six');
  text.h6.array = () => extractTextAsArray(raw, type => type === 'header-six');

  text.code = () => extractTextFromBlocks(raw, ({ type }) => type === 'code-block');
  text.code.array = () => extractTextAsArray(raw, type => type === 'code-block');

  text.quote = () => extractTextFromBlocks(raw, ({ type }) => type === 'blockquote');
  text.quote.array = () => extractTextAsArray(raw, type => type === 'blockquote');

  return { text };
};

export default getContentStateMetadata;
