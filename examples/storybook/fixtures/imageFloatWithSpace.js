const emptyBlock = id => ({
  key: `dq9q${id}`,
  text: '',
  type: 'unstyled',
  depth: 0,
  inlineStyleRanges: [],
  entityRanges: [],
  data: {},
});

const createNewLines = num => new Array(num).fill(1).map((_, i) => emptyBlock(i));

export default {
  blocks: [
    ...createNewLines(5),
    {
      key: 'foo',
      text: 'This one displays weird space issue happened w/ blog (JIRA)',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 54,
          length: 4,
          style: 'UNDERLINE',
        },
      ],
      entityRanges: [
        {
          offset: 54,
          length: 4,
          key: 0,
        },
      ],
      data: {},
    },
    {
      key: 'c7rdd',
      text:
        "Content state appear below, copy and paste here to see the actual problem (viewer has extra space below which doesn't appear on editor so it can't be deleted 😪)",
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 43,
          length: 4,
          style: 'UNDERLINE',
        },
        {
          offset: 110,
          length: 7,
          style: 'BOLD',
        },
      ],
      entityRanges: [
        {
          offset: 43,
          length: 4,
          key: 1,
        },
        {
          offset: 158,
          length: 1,
          key: 2,
        },
      ],
      data: {},
    },
    {
      key: 'bmpfl',
      text: ' ',
      type: 'atomic',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 3,
        },
      ],
      data: {},
    },
    ...createNewLines(37),
  ],
  entityMap: {
    '0': {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url: 'https://jira.wixpress.com/browse/NWB-2849',
        target: '_blank',
        rel: 'noopener',
      },
    },
    '1': {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url: 'https://rich-content-6-6-8.surge.sh',
        target: '_blank',
        rel: 'noopener',
      },
    },
    '2': {
      type: 'EMOJI_TYPE',
      mutability: 'IMMUTABLE',
      data: {
        emojiUnicode: '😪',
      },
    },
    '3': {
      type: 'wix-draft-plugin-image',
      mutability: 'IMMUTABLE',
      data: {
        config: {
          alignment: 'left',
          size: 'inline',
          showTitle: true,
          showDescription: true,
          width: 707,
        },
        src: {
          id: '599ada_e9c9134635b544f0857ccc3ce9e0fa68~mv2.jpg',
          original_file_name: '599ada_e9c9134635b544f0857ccc3ce9e0fa68~mv2.jpg',
          file_name: '599ada_e9c9134635b544f0857ccc3ce9e0fa68~mv2.jpg',
          width: 522,
          height: 522,
        },
      },
    },
  },
  VERSION: '6.6.8',
};
