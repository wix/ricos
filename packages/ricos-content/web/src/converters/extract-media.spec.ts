import { extractMedia } from './extract-media';

const draftContentWithImages = {
  blocks: [
    {
      key: '50k2j',
      text: 'image:',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {
        dynamicStyles: {
          'line-height': '1.38',
        },
      },
    },
    {
      key: '5idk1',
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
      key: '2amts',
      text: 'gallery:',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'fmfos',
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
      key: '6j4ge',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'p81l',
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
          disableExpand: false,
        },
        metadata: {
          caption: 'wedding',
        },
        disableExpand: false,
        src: {
          id: 'bcb5bc2f8a914694b8dc0c9ff2575f79',
          original_file_name: '8bb438_53cc82c7bc8a4b41baf4db640e8b5641.jpg',
          file_name: '8bb438_53cc82c7bc8a4b41baf4db640e8b5641.jpg',
          width: 5120,
          height: 3413,
        },
      },
    },
    '1': {
      type: 'wix-draft-plugin-gallery',
      mutability: 'IMMUTABLE',
      data: {
        config: {
          alignment: 'center',
          size: 'content',
          layout: 'small',
          spacing: 0,
          disableExpand: false,
        },
        items: [
          {
            metadata: {
              type: 'image',
              height: 3497,
              width: 5000,
              altText: 'Wedding2',
            },
            itemId: 'be4312f031f9850a825b2064b9c92d72',
            url: '8bb438_a3a11b05e3f54f77ba1c04dfba22c99c.jpg',
          },
          {
            metadata: {
              type: 'image',
              height: 4930,
              width: 3286,
            },
            itemId: 'ad45c7343a2ecf89982122c4097a054d',
            url: '8bb438_263b45a6faeb49e887b71d10a728516d.jpg',
          },
          {
            metadata: {
              type: 'image',
              height: 2247,
              width: 3370,
            },
            itemId: '0d2ad7a4819f0ed012d3953853070be8',
            url: '8bb438_0d6efcfc699344a2822fec577f398973.jpg',
          },
        ],
        styles: {
          galleryLayout: 2,
        },
        disableExpand: false,
      },
    },
  },
  VERSION: '8.36.3',
};

/* eslint-disable max-len */
describe('extractMedia (DraftContent)', () => {
  it('should extract images from image and gallery', () => {
    const expected = [
      {
        imageUrl:
          'https://static.wixstatic.com/media/8bb438_53cc82c7bc8a4b41baf4db640e8b5641.jpg/v1/fill/w_5120,h_3413,al_c,q_90/8bb438_53cc82c7bc8a4b41baf4db640e8b5641.jpg',
        imageWidth: 5120,
        imageHeight: 3413,
        imageCaption: 'wedding',
        imageAlt: '',
      },
      {
        imageUrl:
          'https://static.wixstatic.com/media/8bb438_a3a11b05e3f54f77ba1c04dfba22c99c.jpg/v1/fill/w_5000,h_3497,al_c,q_90/8bb438_a3a11b05e3f54f77ba1c04dfba22c99c.jpg',
        imageWidth: 5000,
        imageHeight: 3497,
        imageAlt: 'Wedding2',
        imageCaption: '',
      },
      {
        imageUrl:
          'https://static.wixstatic.com/media/8bb438_263b45a6faeb49e887b71d10a728516d.jpg/v1/fill/w_3286,h_4930,al_c,q_90/8bb438_263b45a6faeb49e887b71d10a728516d.jpg',
        imageWidth: 3286,
        imageHeight: 4930,
        imageCaption: '',
        imageAlt: '',
      },
      {
        imageUrl:
          'https://static.wixstatic.com/media/8bb438_0d6efcfc699344a2822fec577f398973.jpg/v1/fill/w_3370,h_2247,al_c,q_90/8bb438_0d6efcfc699344a2822fec577f398973.jpg',
        imageWidth: 3370,
        imageHeight: 2247,
        imageAlt: '',
        imageCaption: '',
      },
    ];
    const actual = extractMedia(draftContentWithImages);
    expect(actual).toStrictEqual(expected);
  });
  it('should extract videos from video and gif', () => {});
});
