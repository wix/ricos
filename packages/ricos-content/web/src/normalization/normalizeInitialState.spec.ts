import deepFreeze from 'deep-freeze';
import normalizeInitialState from './normalizeInitialState';
import { Version } from '../version';
import {
  inlineLegacyImageContentState,
  inlineImageContentState,
  processedInlineImageContentState,
  inlineGalleryContentState,
  processedInlineGalleryContentState,
  AnchorInTextContentState,
  AnchorInImageContentState,
  errorBlocksContentState,
  processedErrorBlocksContentState,
} from './Fixtures';
import { RicosInlineStyleRange, RicosEntityRange, RicosContent, RicosContentBlock } from '../types';

const createState = ({
  text = 'bla bla bla  bla   ',
  type = 'unstyled',
  inlineStyleRanges = [],
  entityRanges = [],
  entityMap = {},
  data = {},
  VERSION,
}: {
  text?: string;
  type?: RicosContentBlock['type'];
  inlineStyleRanges?: RicosInlineStyleRange[];
  entityRanges?: RicosEntityRange[];
  entityMap?: RicosContent['entityMap'];
  data?: RicosContentBlock['data'];
  VERSION?: RicosContent['VERSION'];
}): RicosContent =>
  deepFreeze({
    blocks: [{ text, type, inlineStyleRanges, depth: 0, key: '1', entityRanges, data }],
    entityMap: entityMap || {},
    ...(VERSION ? { VERSION } : {}),
  });

describe('normalizeInitialState', () => {
  describe('inline header removal', () => {
    const INLINE_HEADERS = ['inline-header-one', 'inline-header-two', 'inline-header-three'];

    describe('for unstyled block', () => {
      it('should leave type unchanged if it contains plain text', () => {
        const actual = normalizeInitialState(
          createState({
            inlineStyleRanges: [
              { offset: 8, length: 3, style: 'inline-header-one' },
              { offset: 0, length: 3, style: 'inline-header-two' },
              { offset: 4, length: 3, style: 'inline-header-three' },
              { offset: 2, length: 1, style: 'ITALIC' },
              { offset: 0, length: 2, style: 'UNDERLINE' },
              { offset: 8, length: 7, style: 'UNDERLINE' },
              { offset: 4, length: 7, style: 'BOLD' },
            ],
          }),
          {}
        );
        const expected = createState({
          inlineStyleRanges: [
            { offset: 2, length: 1, style: 'ITALIC' },
            { offset: 0, length: 2, style: 'UNDERLINE' },
            { offset: 8, length: 7, style: 'UNDERLINE' },
            { offset: 4, length: 7, style: 'BOLD' },
          ],
          VERSION: Version.currentVersion,
        });

        expect(actual).toEqual(expected);
      });

      describe.each([
        [
          'header-one',
          [
            { offset: 2, length: 1, style: 'ITALIC' },
            { offset: 0, length: 8, style: 'inline-header-one' },
            { offset: 0, length: 2, style: 'UNDERLINE' },
            { offset: 8, length: 11, style: 'inline-header-one' },
            { offset: 8, length: 7, style: 'UNDERLINE' },
            { offset: 4, length: 7, style: 'BOLD' },
          ],
        ],
        [
          'header-two',
          [
            { offset: 0, length: 8, style: 'inline-header-one' },
            { offset: 2, length: 1, style: 'ITALIC' },
            { offset: 0, length: 2, style: 'UNDERLINE' },
            { offset: 0, length: 2, style: 'inline-header-two' },
            { offset: 2, length: 6, style: 'inline-header-one' },
            { offset: 8, length: 11, style: 'inline-header-two' },
            { offset: 8, length: 7, style: 'UNDERLINE' },
            { offset: 4, length: 7, style: 'BOLD' },
          ],
        ],
        [
          'header-three',
          [
            { offset: 0, length: 8, style: 'inline-header-one' },
            { offset: 2, length: 1, style: 'ITALIC' },
            { offset: 0, length: 2, style: 'UNDERLINE' },
            { offset: 0, length: 2, style: 'inline-header-two' },
            { offset: 8, length: 11, style: 'inline-header-three' },
            { offset: 2, length: 6, style: 'inline-header-one' },
            { offset: 8, length: 7, style: 'UNDERLINE' },
            { offset: 4, length: 7, style: 'BOLD' },
          ],
        ],
      ])('conversation to %s', (expectedType, initialRanges) => {
        it('should remove inline header ranges and convert block', () => {
          const actual = normalizeInitialState(
            createState({
              type: 'unstyled',
              inlineStyleRanges: initialRanges,
            }),
            {}
          );
          const expected = createState({
            type: expectedType,
            VERSION: Version.currentVersion,
            inlineStyleRanges: [
              { offset: 2, length: 1, style: 'ITALIC' },
              { offset: 0, length: 2, style: 'UNDERLINE' },
              { offset: 8, length: 7, style: 'UNDERLINE' },
              { offset: 4, length: 7, style: 'BOLD' },
            ],
          });

          expect(actual).toEqual(expected);
        });

        const setRangeStyles = ranges => {
          const headers = INLINE_HEADERS.slice(
            0,
            INLINE_HEADERS.indexOf(`inline-${expectedType}`) + 1
          );
          return ranges.map((range, index) => ({
            ...range,
            style: headers[index % headers.length],
          }));
        };

        it('should ignore spaces', () => {
          const actual = normalizeInitialState(
            createState({
              type: 'unstyled',
              inlineStyleRanges: setRangeStyles([
                { offset: 13, length: 3 },
                { offset: 0, length: 11 },
                { offset: 0, length: 5 },
              ]),
            }),
            {}
          );
          const expected = createState({
            type: expectedType,
            inlineStyleRanges: [],
            VERSION: Version.currentVersion,
          });

          expect(actual).toEqual(expected);
        });
      });
    });

    describe.each([
      'ordered-list-item',
      'unordered-list-item',
      'blockquote',
      'code-block',
      'header-one',
      'header-two',
      'header-three',
    ])('for %s block', type => {
      it('should remove inline header ranges without changing block type', () => {
        const actual = normalizeInitialState(
          createState({
            type,
            inlineStyleRanges: [
              { offset: 0, length: 4, style: 'inline-header-one' },
              { offset: 2, length: 1, style: 'ITALIC' },
              { offset: 11, length: 4, style: 'inline-header-two' },
              { offset: 0, length: 2, style: 'UNDERLINE' },
              { offset: 8, length: 7, style: 'UNDERLINE' },
              { offset: 4, length: 7, style: 'inline-header-three' },
              { offset: 4, length: 7, style: 'BOLD' },
            ],
          }),
          {}
        );
        const expected = createState({
          type,
          VERSION: Version.currentVersion,
          inlineStyleRanges: [
            { offset: 2, length: 1, style: 'ITALIC' },
            { offset: 0, length: 2, style: 'UNDERLINE' },
            { offset: 8, length: 7, style: 'UNDERLINE' },
            { offset: 4, length: 7, style: 'BOLD' },
          ],
        });

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('entity range completion for URLs', () => {
    const config = {
      anchorTarget: '_self',
      relValue: 'noopener',
    };

    it('should add link entities and ranges for all valid URLs in the block', () => {
      const initialState = {
        text: 'google.com some other text wix.com',
      };

      const actual = normalizeInitialState(createState(initialState), config);
      const expected = createState({
        ...initialState,
        VERSION: Version.currentVersion,
        entityRanges: [
          {
            offset: 0,
            length: 10,
            key: 0,
          },
          {
            offset: 27,
            length: 7,
            key: 1,
          },
        ],
        entityMap: {
          0: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'google.com',
              target: '_self',
              rel: 'noopener',
            },
          },
          1: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'wix.com',
              target: '_self',
              rel: 'noopener',
            },
          },
        },
      });
      expect(actual.blocks[0].entityRanges).toEqual(expected.blocks[0].entityRanges);
      expect(actual.entityMap).toEqual(expected.entityMap);
    });

    it('should set proper entity keys for the entity map', () => {
      const initialState = {
        text: 'google.com some other text wix.com',
        entityMap: {
          0: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'reddit.com',
              target: '_self',
              rel: 'noopener',
            },
          },
          2: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'test.com',
              target: '_self',
              rel: 'noopener',
            },
          },
        },
      };

      const actual = normalizeInitialState(createState(initialState), config);
      const expected = createState({
        ...initialState,
        VERSION: Version.currentVersion,
        entityRanges: [
          {
            offset: 0,
            length: 10,
            key: 3,
          },
          {
            offset: 27,
            length: 7,
            key: 4,
          },
        ],
        entityMap: {
          0: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'reddit.com',
              target: '_self',
              rel: 'noopener',
            },
          },
          2: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'test.com',
              target: '_self',
              rel: 'noopener',
            },
          },
          3: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'google.com',
              target: '_self',
              rel: 'noopener',
            },
          },
          4: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'wix.com',
              target: '_self',
              rel: 'noopener',
            },
          },
        },
      });
      expect(actual.blocks[0].entityRanges).toEqual(expected.blocks[0].entityRanges);
      expect(actual.entityMap).toEqual(expected.entityMap);
    });
  });

  describe('underline range completion for links', () => {
    const config = {
      anchorTarget: '_blank',
      relValue: 'noopener',
    };

    it('should add underline style ranges for link entity ranges', () => {
      const initialState = {
        text: 'text_1',
        entityRanges: [
          {
            offset: 0,
            length: 6,
            key: 0,
          },
          {
            offset: 0,
            length: 1,
            key: 1,
          },
        ],
        entityMap: {
          0: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'link1.com',
              target: '_blank',
              rel: 'nofollow',
            },
          },
          1: {
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
      };

      const actual = normalizeInitialState(createState(initialState), config);
      const expected = createState({
        ...initialState,
        VERSION: Version.currentVersion,
        entityMap: {
          ...initialState.entityMap,
          0: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'link1.com',
              target: '_blank',
              rel: 'nofollow',
            },
          },
        },
        inlineStyleRanges: [
          {
            offset: 0,
            length: 6,
            style: 'UNDERLINE',
          },
        ],
      });
      expect(actual).toEqual(expected);
    });

    it('should not modify existing inline style ranges', () => {
      const initialState = {
        text: 'text_1',
        inlineStyleRanges: [
          {
            offset: 0,
            length: 6,
            style: 'BOLD',
          },
        ],
        entityRanges: [
          {
            offset: 0,
            length: 6,
            key: 0,
          },
        ],
        entityMap: {
          0: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'link1.com',
              target: '_blank',
              rel: 'nofollow',
            },
          },
        },
      };

      const actual = normalizeInitialState(createState(initialState), config);
      const expected = createState({
        ...initialState,
        VERSION: Version.currentVersion,
        entityMap: {
          ...initialState.entityMap,
          0: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'link1.com',
              target: '_blank',
              rel: 'nofollow',
            },
          },
        },
        inlineStyleRanges: [
          {
            offset: 0,
            length: 6,
            style: 'BOLD',
          },
          {
            offset: 0,
            length: 6,
            style: 'UNDERLINE',
          },
        ],
      });
      expect(actual).toEqual(expected);
    });

    it('should not duplicate ranges', () => {
      const initialState = {
        text: 'text_1',
        entityRanges: [
          {
            offset: 0,
            length: 6,
            key: 0,
          },
        ],
        entityMap: {
          0: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'link1.com',
              target: '_blank',
              rel: 'nofollow',
            },
          },
        },
        inlineStyleRanges: [
          {
            offset: 0,
            length: 6,
            style: 'UNDERLINE',
          },
        ],
      };

      const actual = normalizeInitialState(createState(initialState), config);
      const expected = createState({
        ...initialState,
        VERSION: Version.currentVersion,
        entityMap: {
          ...initialState.entityMap,
          0: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'link1.com',
              target: '_blank',
              rel: 'nofollow',
            },
          },
        },
      });
      expect(actual).toEqual(expected);
    });

    it('should skip higher-versioned content', () => {
      const initialState = {
        text: 'text_1',
        entityRanges: [
          {
            offset: 0,
            length: 6,
            key: 0,
          },
        ],
        entityMap: {
          0: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'link1.com',
              target: '_blank',
              rel: 'nofollow',
            },
          },
        },
        VERSION: Version.currentVersion,
      };

      const actual = normalizeInitialState(createState(initialState), config);
      const expected = createState({
        ...initialState,
        VERSION: Version.currentVersion,
        entityMap: {
          ...initialState.entityMap,
          0: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'link1.com',
              target: '_blank',
              rel: 'nofollow',
            },
          },
        },
      });
      expect(actual).toEqual(expected);
    });
  });

  describe('image normalizer', () => {
    it('should move width from entity data to data.config', () => {
      const commonData = {
        config: {
          alignment: 'center',
          size: 'inline',
          showTitle: true,
          showDescription: true,
        },
        src: {
          id: '599ada_e9c9134635b544f0857ccc3ce9e0fa68~mv2.jpg',
          // eslint-disable-next-line camelcase
          original_file_name: '599ada_e9c9134635b544f0857ccc3ce9e0fa68~mv2.jpg',
          // eslint-disable-next-line camelcase
          file_name: '599ada_e9c9134635b544f0857ccc3ce9e0fa68~mv2.jpg',
          width: 522,
          height: 522,
        },
      };
      const badData = {
        ...commonData,
        width: 707,
      };

      const goodData = {
        ...commonData,
        config: {
          ...commonData.config,
          width: 707,
        },
      };

      const initialState = data => ({
        blocks: [
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
            data,
          },
        },
      });

      const actual = normalizeInitialState(initialState(badData), {});
      const goodDataWithVersion = {
        ...initialState(goodData),
        VERSION: Version.currentVersion,
      };
      expect(actual).toEqual(goodDataWithVersion);
    });
  });

  describe('gallery normalizer', () => {
    const commonData = titleString => ({
      items: [
        {
          metadata: {
            [titleString]: 'My Titleeeeeeeeee',
          },
        },
        {
          metadata: {},
        },
        {
          metadata: {
            [titleString]: 'My Titleeeeeeeeee',
          },
        },
      ],
      styles: {},
      config: {},
    });

    const initialState = (VERSION: string, titleString: string): RicosContent => ({
      blocks: [
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
              key: 0,
            },
          ],
          data: {},
        },
      ],
      entityMap: {
        '0': {
          type: 'wix-draft-plugin-gallery',
          mutability: 'IMMUTABLE',
          data: commonData(titleString),
        },
      },
      VERSION,
    });

    it('should change title to altText when version < 6', () => {
      const oldContentState = initialState('5.9999.9', 'title');
      const newContentState = initialState(Version.currentVersion, 'altText');
      const normalizedState = normalizeInitialState(oldContentState);

      expect(normalizedState).toEqual(newContentState);
    });
    it('should not change title to altText when version >= 6', () => {
      const contentState = initialState('6.0.0', 'title');
      const newContentState = initialState(Version.currentVersion, 'title');

      expect(normalizeInitialState(contentState)).toEqual(newContentState);
    });
  });

  describe('inline plugins removals', () => {
    it('should remove legacy IMAGE plugin', () => {
      const actual = normalizeInitialState(inlineLegacyImageContentState, {
        disableInlineImages: true,
      });

      expect(actual).toEqual({
        ...processedInlineImageContentState,
        VERSION: Version.currentVersion,
      });
    });

    it('should remove wix-draft-plugin-image plugin', () => {
      const actual = normalizeInitialState(inlineImageContentState, { disableInlineImages: true });
      expect(actual).toEqual({
        ...processedInlineImageContentState,
        VERSION: Version.currentVersion,
      });
    });

    it('should remove wix-draft-plugin-gallery plugin', () => {
      const actual = normalizeInitialState(inlineGalleryContentState, {
        removeInvalidInlinePlugins: true,
      });
      expect(actual).toEqual({
        ...processedInlineGalleryContentState,
        VERSION: Version.currentVersion,
      });
    });
  });

  describe('anchor normalizer', () => {
    it('should remove anchor type (text)', () => {
      const actual = normalizeInitialState(AnchorInTextContentState, {});
      expect(actual.entityMap['0'].type).toEqual('LINK');
      expect(actual.entityMap['1'].type).toEqual('LINK');
    });

    it('should remove anchor type (image)', () => {
      const actual = normalizeInitialState(AnchorInImageContentState, {});
      expect(actual.entityMap['0'].data.config.link).toEqual({ anchor: 'cjvg0' });
      expect(actual.entityMap['1'].data.config.link).toEqual({ anchor: 'cjvg0' });
    });
  });

  describe('error blocks removals', () => {
    it('should remove all blocks with errors', () => {
      const actual = normalizeInitialState(errorBlocksContentState, {});
      expect(actual).toEqual({
        ...processedErrorBlocksContentState,
        VERSION: Version.currentVersion,
      });
    });
  });
});
