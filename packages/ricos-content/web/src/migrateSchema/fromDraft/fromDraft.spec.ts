/* eslint-disable no-unused-vars */

import { fromDraft } from './fromDraft';
import { compare } from '../../comparision/compare';
import fixture from '../../../../../../e2e/tests/fixtures/intro.json';
import complexFixture from '../../../../../../e2e/tests/fixtures/migration-content.json';
import { getTextNodes } from './getTextNodes';
import ricosFixture from './migratedFixtures/intro.json';
import complexRicosFixture from './migratedFixtures/migration-content.json';
import { rich_content } from 'ricos-schema';

const filterKeys = objArr => objArr.map(({ key, ...rest }) => rest); //disable
describe('migrate from draft', () => {
  it('should migrate intro fixture', () => {
    expect(compare(fromDraft(fixture), ricosFixture, { ignoredKeys: ['key'] })).toEqual({});
  });

  it('should migrate complex fixture', () => {
    expect(
      compare(fromDraft(complexFixture), complexRicosFixture, { ignoredKeys: ['key'] })
    ).toEqual({});
  });

  it('should overlap styles', () => {
    const block = {
      key: 'foo',
      text: 'blah blah blah',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 3,
          length: 3,
          style: 'ITALIC',
        },
        {
          offset: 5,
          length: 5,
          style: 'UNDERLINE',
        },
        {
          offset: 8,
          length: 4,
          style: 'BOLD',
        },
      ],
      entityRanges: [],
    };

    const expectedResults = [
      {
        key: '2k4v1',
        nodes: [],
        textData: { decorations: [], text: 'bla' },
        type: rich_content.Node.Type.TEXT,
      },
      {
        key: '1ba7b',
        nodes: [],
        textData: { decorations: [{ type: rich_content.Decoration.Type.ITALIC }], text: 'h ' },
        type: rich_content.Node.Type.TEXT,
      },
      {
        key: '59lhm',
        nodes: [],
        textData: {
          decorations: [
            { type: rich_content.Decoration.Type.ITALIC },
            { type: rich_content.Decoration.Type.UNDERLINE },
          ],
          text: 'b',
        },
        type: rich_content.Node.Type.TEXT,
      },
      {
        key: '1agl0',
        nodes: [],
        textData: { decorations: [{ type: rich_content.Decoration.Type.UNDERLINE }], text: 'la' },
        type: rich_content.Node.Type.TEXT,
      },
      {
        key: '1m39g',
        nodes: [],
        textData: {
          decorations: [
            { type: rich_content.Decoration.Type.UNDERLINE },
            { type: rich_content.Decoration.Type.BOLD },
          ],
          text: 'h ',
        },
        type: rich_content.Node.Type.TEXT,
      },
      {
        key: '8cr95',
        nodes: [],
        textData: { decorations: [{ type: rich_content.Decoration.Type.BOLD }], text: 'bl' },
        type: rich_content.Node.Type.TEXT,
      },
      {
        key: 'dkn86',
        nodes: [],
        textData: { decorations: [], text: 'ah' },
        type: rich_content.Node.Type.TEXT,
      },
    ];

    const entityMap = {};
    expect(filterKeys(getTextNodes(block, entityMap))).toEqual(filterKeys(expectedResults));
  });

  it('should detect mentions', () => {
    const block = {
      key: 'fcm70',
      text: 'Mentions too @Test One ',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 13,
          length: 9,
          key: 0,
        },
      ],
      data: {},
    };
    const entityMap = {
      '0': {
        type: 'mention',
        mutability: 'SEGMENTED',
        data: {
          mention: {
            name: 'Test One',
            slug: 'testone',
          },
        },
      },
    };

    const expectedResult = [
      {
        nodes: [],
        textData: { decorations: [], text: 'Mentions too ' },
        type: rich_content.Node.Type.TEXT,
      },
      {
        nodes: [],
        textData: {
          decorations: [
            {
              mentionData: {
                name: 'Test One',
                slug: 'testone',
              },
              type: rich_content.Decoration.Type.MENTION,
            },
          ],
          text: '@Test One',
        },
        type: rich_content.Node.Type.TEXT,
      },
      { nodes: [], textData: { decorations: [], text: ' ' }, type: rich_content.Node.Type.TEXT },
    ];
    expect(filterKeys(getTextNodes(block, entityMap))).toEqual(expectedResult);
  });
});
