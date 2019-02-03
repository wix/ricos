import deepFreeze from 'deep-freeze';
import uut from './normalizeInitialState';

describe('normalizeInitialState', () => {
  describe('inline header removal', () => {
    const text = 'bla bla bla  bla   ';
    const createState = ({ type, inlineStyleRanges }) =>
      deepFreeze({
        blocks: [{ text, type, inlineStyleRanges, depth: 0, key: '1', entityRanges: [], data: {} }],
        entityMap: {},
      });

    const INLINE_HEADERS = ['inline-header-one', 'inline-header-two', 'inline-header-three'];

    describe('for unstyled block', () => {
      it('should leave type unchanged if it contains plain text', () => {
        const actual = uut(
          createState({
            type: 'unstyled',
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
          type: 'unstyled',
          inlineStyleRanges: [
            { offset: 2, length: 1, style: 'ITALIC' },
            { offset: 0, length: 2, style: 'UNDERLINE' },
            { offset: 8, length: 7, style: 'UNDERLINE' },
            { offset: 4, length: 7, style: 'BOLD' },
          ],
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
          const actual = uut(
            createState({
              type: 'unstyled',
              inlineStyleRanges: initialRanges,
            }),
            {}
          );
          const expected = createState({
            type: expectedType,
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
          const actual = uut(
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
        const actual = uut(
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
});
