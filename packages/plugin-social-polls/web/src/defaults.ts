import { PaletteColors, ThemeUtils } from 'wix-rich-content-common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const theme = (colors: PaletteColors, utils: ThemeUtils) => {
  return {};
};

export const LAYOUT = {
  LIST: 'list',
  GRID: 'grid',
};

export const BACKGROUND_TYPE = {
  COLOR: 'color',
  IMAGE: 'image',
  GRADIENT: 'gradient',
};

/* eslint-disable max-len */
export const BACKGROUND_PRESETS = {
  [BACKGROUND_TYPE.COLOR]: [
    '#EF4538',
    '#F96132',
    '#FAAD4D',
    '#31B778',
    '#488FFE',
    '#11428D',
    '#6C49EF',
    '#8C0F7A',
  ],
  [BACKGROUND_TYPE.IMAGE]: [
    'https://static.wixstatic.com/media/2dfdd3_03c2331b19bb41108b34938edf8951dd~mv2.jpg',
    'https://static.wixstatic.com/media/2dfdd3_df028f9258cf4fe0a1b7f75a3916def1~mv2.jpg',
    'https://static.wixstatic.com/media/2dfdd3_b120b7d9cffd4645bb143beadef13c56~mv2.jpg',
    'https://static.wixstatic.com/media/2dfdd3_1977932e94064f168abaaa2c04b678a5~mv2.jpg',
    'https://static.wixstatic.com/media/2dfdd3_17b428ae1fb14736a2ab30994620ee62~mv2.jpg',
    'https://static.wixstatic.com/media/2dfdd3_934a080451cd4b3eb6e7c9485a07972c~mv2.jpg',
    'https://static.wixstatic.com/media/2dfdd3_0b440a1138ba4c99bc954eb4d06ec0ad~mv2.jpg',
    'https://static.wixstatic.com/media/2dfdd3_395a5522e3474b3ca34194633e90ea81~mv2.jpg',
  ],
  [BACKGROUND_TYPE.GRADIENT]: [
    {
      angle: 45,
      start: '#EF4538',
      end: '#488FFE',
    },
    {
      angle: 45,
      start: '#F96132',
      end: '#FAAD4D',
    },
    {
      angle: 45,
      start: '#31B778',
      end: '#FAAD4D',
    },
    {
      angle: 45,
      start: '#0D6546',
      end: '#31B778',
    },
    {
      angle: 45,
      start: '#488FFE',
      end: '#8C0F7A',
    },
    {
      angle: 45,
      start: '#11428D',
      end: '#488FFE',
    },
    {
      angle: 45,
      start: '#6C49EF',
      end: '#31B778',
    },
    {
      angle: 45,
      start: '#8C0F7A',
      end: '#FAAD4D',
    },
  ].map(value => JSON.stringify(value)),
};

export const OPTION_IMAGES_POOL = [
  'https://static.wixstatic.com/media/fb62d9f8e7824b2e90b13b971e700b92.jpg',
  'https://static.wixstatic.com/media/3a27828e768344158489df4f2c03cfb2.jpg',
];

export const POLL_IMAGES_POOL = [
  'https://static.wixstatic.com/media/436483e6ed9e41fe91b9f286d2ea4efb.jpg',
];
/* eslint-enable max-len */

export const MEMBER_ROLES = {
  ALL: 'ALL',
  SITE_MEMBERS: 'SITE_MEMBERS',
};

export const DIRECTION = {
  LTR: 'ltr',
  RTL: 'rtl',
};

export const VISIBILITY = {
  ALWAYS: 'ALWAYS',
  VOTERS: 'VOTERS_ONLY',
  ME: 'ONLY_ME',
};

export const DEFAULT_COMPONENT_DATA = {
  config: {
    alignment: 'center',
    size: 'large',
    width: 'full-width',
    enableVoteRole: false,
  },
  poll: {
    ownVotes: [],
    title: '',
    settings: {
      multipleVotes: false,
      votesDisplay: true,
      votersDisplay: true,
      voteRole: MEMBER_ROLES.SITE_MEMBERS,
      resultsVisibility: VISIBILITY.VOTERS,
    },
    options: [],
  },
  layout: {
    poll: {
      type: LAYOUT.LIST,
      direction: DIRECTION.LTR,
      enableImage: false,
    },
    option: {
      enableImage: false,
    },
  },
  design: {
    poll: {
      backgroundType: BACKGROUND_TYPE.COLOR,
      background: BACKGROUND_PRESETS[BACKGROUND_TYPE.COLOR][2],
      borderRadius: 0,
    },
    option: {
      borderRadius: 0,
    },
  },
};
