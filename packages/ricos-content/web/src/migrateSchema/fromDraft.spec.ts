/* eslint-disable no-unused-vars */
import { MigrateSchema } from '.';
import { compare } from '../comparision/compare';

import fixture from '../../../../../e2e/tests/fixtures/intro.json';
import { getTextNodes } from './getTextNodes';
const ricosFixture = require('./migratedFixtures/intro.json');
describe('migrate from draft', () => {
  it('should migrate intro fixture', () => {
    expect(compare(MigrateSchema.fromDraft(fixture), ricosFixture)).toEqual({});
  });

  it('getTextNodes', () => {
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
      { key: '2k4v1', nodes: [], ricosText: { decorations: [], text: 'bla' }, type: 'text' },
      {
        key: '1ba7b',
        nodes: [],
        ricosText: { decorations: [{ type: 'italic' }], text: 'h ' },
        type: 'text',
      },
      {
        key: '59lhm',
        nodes: [],
        ricosText: { decorations: [{ type: 'italic' }, { type: 'underline' }], text: 'b' },
        type: 'text',
      },
      {
        key: '1agl0',
        nodes: [],
        ricosText: { decorations: [{ type: 'underline' }], text: 'la' },
        type: 'text',
      },
      {
        key: '1m39g',
        nodes: [],
        ricosText: { decorations: [{ type: 'underline' }, { type: 'bold' }], text: 'h ' },
        type: 'text',
      },
      {
        key: '8cr95',
        nodes: [],
        ricosText: { decorations: [{ type: 'bold' }], text: 'bl' },
        type: 'text',
      },
      { key: 'dkn86', nodes: [], ricosText: { decorations: [], text: 'ah' }, type: 'text' },
    ];

    const filterKeys = objArr => objArr.map(({ key, ...rest }) => rest); //disable

    const entityMap = {};
    const keyMapping = {};
    expect(filterKeys(getTextNodes(block, entityMap, keyMapping))).toEqual(
      filterKeys(expectedResults)
    );
  });
});
