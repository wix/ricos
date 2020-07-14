export const dynamicStyles = {
  'line-height': '2.5',
  'padding-top': '0',
  'padding-bottom': '0',
};

export const raw = {
  blocks: [
    {
      key: 'foo',
      text: 'test',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {
        dynamicStyles: {
          'line-height': '2.5',
          'padding-top': '0',
          'padding-bottom': '0',
        },
      },
    },
    {
      key: 'bar',
      text: 'test2',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
  VERSION: '6.8.0',
};

export const rawWithAnchors = {
  blocks: [
    {
      key: '1jlo1',
      text: 'blabla',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'dcjif',
      text: 'blabla2',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'fmgsp',
      text: 'anchor1',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 7,
          style: 'UNDERLINE',
        },
      ],
      entityRanges: [
        {
          offset: 0,
          length: 7,
          key: 0,
        },
      ],
      data: {},
    },
    {
      key: 'avt0k',
      text: 'anchor2',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 7,
          style: 'UNDERLINE',
        },
      ],
      entityRanges: [
        {
          offset: 0,
          length: 7,
          key: 1,
        },
      ],
      data: {},
    },
  ],
  entityMap: {
    '0': {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        anchor: '1jlo1',
      },
    },
    '1': {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        anchor: 'dcjif',
      },
    },
  },
  VERSION: '7.12.2',
};
