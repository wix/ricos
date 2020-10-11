type BlockType =
  | 'unstyled'
  | 'blockquote'
  | 'header-one'
  | 'header-two'
  | 'header-three'
  | 'header-four'
  | 'header-five'
  | 'header-six';

export default (text: string, type: BlockType = 'unstyled') => {
  return {
    blocks: [
      {
        key: 'd79aa',
        text,
        type,
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
    VERSION: '7.5.0',
  };
};
