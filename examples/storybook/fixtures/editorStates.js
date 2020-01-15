export const introState = {
  blocks: [
    {
      key: 'foo',
      text: 'Hi!',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '8p4aq',
      text: "I'm Wix RIch Content Editor, and I can do so many things:",
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'aopi8',
      text: 'Lists for example',
      type: 'ordered-list-item',
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 10,
          length: 7,
          style: 'BOLD',
        },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: '6dm40',
      text: 'Checkout my Links',
      type: 'ordered-list-item',
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 8,
          style: 'ITALIC',
        },
        {
          offset: 12,
          length: 5,
          style: 'UNDERLINE',
        },
      ],
      entityRanges: [
        {
          offset: 12,
          length: 5,
          key: 0,
        },
      ],
      data: {},
    },
    {
      key: '3opa7',
      text: '#hashtags too!',
      type: 'ordered-list-item',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '4hcve',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '6vbuk',
      text: ' ',
      type: 'atomic',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 1,
        },
      ],
      data: {},
    },
    {
      key: 'c2vgv',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {
    '0': {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url: 'https://rich-content-6-6-6.surge.sh/#!',
        target: '_blank',
        rel: 'noopener',
      },
    },
    '1': {
      type: 'wix-draft-plugin-divider',
      mutability: 'IMMUTABLE',
      data: {
        type: 'single',
        config: {
          size: 'large',
          alignment: 'center',
          textWrap: 'nowrap',
        },
      },
    },
  },
  VERSION: '6.6.6',
};

export const exapmleState = {
  blocks: [
    {
      key: 'foo',
      text: 'This is a #hashtag',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'fold4',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'af9n',
      text: ' ',
      type: 'atomic',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0,
        },
      ],
      data: {},
    },
    {
      key: '5h7av',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {
    '0': {
      type: 'wix-draft-plugin-divider',
      mutability: 'IMMUTABLE',
      data: {
        type: 'single',
        config: {
          size: 'large',
          alignment: 'center',
          textWrap: 'nowrap',
        },
      },
    },
  },
  VERSION: '6.6.3',
};
