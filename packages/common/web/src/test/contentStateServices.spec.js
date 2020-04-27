/* eslint-disable max-len */
import raw from '../../../../../e2e/tests/fixtures/truncateContentState.json';
import { truncateContentState } from '../lib/contentStateServices';
const emptyRaw = {
  blocks: [],
  entityMap: {},
};

const expectedRaw1 = {
  blocks: [
    {
      key: '50k2j',
      text:
        'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. ',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '9asvb',
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
        },
        src: {
          id: '1dcb3c6098ce8c0253fe118f2b244b72',
          original_file_name: '8bb438_2b31b324f130433685c160fdba0a66e9.jpg',
          file_name: '8bb438_2b31b324f130433685c160fdba0a66e9.jpg',
          width: 2016,
          height: 3044,
        },
      },
    },
  },
};

const expectedRaw2 = {
  blocks: [
    {
      key: '50k2j',
      text:
        'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. ',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '9asvb',
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
      key: 'v79l',
      text: 'I have inline styles.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 21,
          style: 'BOLD',
        },
        {
          offset: 0,
          length: 21,
          style: '{"BG":"color4"}',
        },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: '2js9d',
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
      key: 'b8lua',
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
        },
        src: {
          id: '1dcb3c6098ce8c0253fe118f2b244b72',
          original_file_name: '8bb438_2b31b324f130433685c160fdba0a66e9.jpg',
          file_name: '8bb438_2b31b324f130433685c160fdba0a66e9.jpg',
          width: 2016,
          height: 3044,
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
        },
        src: {
          id: '279757098541cffc5689b7bbe39a88b2',
          original_file_name: '8bb438_730e9548a4ae4fe4b717e28c53e89410.jpg',
          file_name: '8bb438_730e9548a4ae4fe4b717e28c53e89410.jpg',
          width: 3648,
          height: 5472,
        },
      },
    },
  },
};

describe('Test content state services functions', () => {
  it('case: index = 0, should return empty raw', () => {
    const newRaw = truncateContentState(raw, 0);
    expect(newRaw).toEqual(emptyRaw);
  });

  it('case: valid index, should be equal ', () => {
    const newRaw = truncateContentState(raw, 2);
    expect(newRaw).toEqual(expectedRaw1);
  });

  it('case: valid index, should be equal ', () => {
    const newRaw = truncateContentState(raw, 5);
    expect(newRaw).toEqual(expectedRaw2);
  });

  it('case: index out of bounds, should return the entered raw', () => {
    const newRaw = truncateContentState(raw, 6);
    expect(newRaw).toEqual(raw);
  });

  it('case: index out of bounds, should return the entered raw', () => {
    const newRaw = truncateContentState(raw, 100);
    expect(newRaw).toEqual(raw);
  });
});
