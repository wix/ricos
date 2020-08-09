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

export const rawWithAnchorsInText = {
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

export const rawWithAnchorsInImage = {
  blocks: [
    {
      key: 'cjvg0',
      text: 'blabla',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '2o49i',
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
      key: 'd1fo2',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'agkmb',
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
      key: '56pj9',
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
      type: 'wix-draft-plugin-image',
      mutability: 'IMMUTABLE',
      data: {
        config: {
          alignment: 'center',
          size: 'content',
          showTitle: true,
          showDescription: true,
          link: {
            anchor: 'cjvg0',
          },
        },
        src: {
          id: '46247b1df460eb0e8272053a9a079ab1',
          original_file_name: '8bb438_e725684e4a1841859668483efd0f9509.jpg',
          file_name: '8bb438_e725684e4a1841859668483efd0f9509.jpg',
          width: 4400,
          height: 3056,
        },
      },
    },
    '1': {
      type: 'wix-draft-plugin-image',
      mutability: 'IMMUTABLE',
      data: {
        config: {
          alignment: 'center',
          size: 'content',
          showTitle: true,
          showDescription: true,
          link: {
            anchor: 'cjvg0',
          },
        },
        src: {
          id: '5fb9385c24ba5972991a2da94fe5b550',
          original_file_name: '8bb438_37f441d6939f4c1eb8e335b231afb7b9.jpg',
          file_name: '8bb438_37f441d6939f4c1eb8e335b231afb7b9.jpg',
          width: 5600,
          height: 3737,
        },
      },
    },
  },
  VERSION: '7.12.3',
};
