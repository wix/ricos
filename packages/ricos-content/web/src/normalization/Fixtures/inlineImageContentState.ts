export default {
  blocks: [
    {
      key: 'foo',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '3rgtb',
      text: '📷 #FALSO: Por la alerta amarilla decretada en el suroccidente de Bogotá, NO.',
      type: 'blockquote',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0,
        },
        {
          offset: 2,
          length: 6,
          key: 1,
        },
      ],
      data: {
        textAlignment: 'justify',
      },
    },
  ],
  entityMap: {
    '0': {
      type: 'wix-draft-plugin-image',
      mutability: 'MUTABLE',
      data: {
        alt: '⚠️',
        src: 'https://s.w.org/images/core/emoji/12.0.0-1/svg/26a0.svg',
        config: {
          size: 'content',
          alignment: 'center',
        },
      },
    },
    '1': {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        href: 'https://twitter.com/hashtag/FALSO?src=hash&ref_src=twsrc%5Etfw',
        url: 'https://twitter.com/hashtag/FALSO?src=hash&ref_src=twsrc%5Etfw',
        target: '_top',
        rel: 'noreferrer',
      },
    },
  },
  VERSION: '7.6.1',
};
