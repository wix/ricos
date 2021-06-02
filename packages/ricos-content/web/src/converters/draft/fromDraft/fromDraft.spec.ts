/* eslint-disable no-unused-vars */

import { fromDraft } from './fromDraft';
import { compare } from '../../../comparision/compare';
import complexFixture from '../../../../../../../e2e/tests/fixtures/migration-content.json';
import { getTextNodes } from './getTextNodes';
import complexRicosFixture from '../../../../statics/json/migratedFixtures/migration-content.json';
import { Node_Type, Decoration_Type, RichContent } from 'ricos-schema';
import { convertBlockDataToRicos } from './convertRicosPluginData';
import { IMAGE_TYPE } from '../../../consts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const filterKeys = objArr => objArr.map(({ key, ...rest }) => rest); //disable
describe('migrate from draft', () => {
  it('should migrate complex fixture', () => {
    expect(
      compare(fromDraft(complexFixture), RichContent.fromJSON(complexRicosFixture), {
        ignoredKeys: ['key'],
      })
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
        type: Node_Type.TEXT,
      },
      {
        key: '1ba7b',
        nodes: [],
        textData: { decorations: [{ type: Decoration_Type.ITALIC }], text: 'h ' },
        type: Node_Type.TEXT,
      },
      {
        key: '59lhm',
        nodes: [],
        textData: {
          decorations: [{ type: Decoration_Type.ITALIC }, { type: Decoration_Type.UNDERLINE }],
          text: 'b',
        },
        type: Node_Type.TEXT,
      },
      {
        key: '1agl0',
        nodes: [],
        textData: { decorations: [{ type: Decoration_Type.UNDERLINE }], text: 'la' },
        type: Node_Type.TEXT,
      },
      {
        key: '1m39g',
        nodes: [],
        textData: {
          decorations: [{ type: Decoration_Type.UNDERLINE }, { type: Decoration_Type.BOLD }],
          text: 'h ',
        },
        type: Node_Type.TEXT,
      },
      {
        key: '8cr95',
        nodes: [],
        textData: { decorations: [{ type: Decoration_Type.BOLD }], text: 'bl' },
        type: Node_Type.TEXT,
      },
      {
        key: 'dkn86',
        nodes: [],
        textData: { decorations: [], text: 'ah' },
        type: Node_Type.TEXT,
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
        type: Node_Type.TEXT,
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
              type: Decoration_Type.MENTION,
            },
          ],
          text: '@Test One',
        },
        type: Node_Type.TEXT,
      },
      { nodes: [], textData: { decorations: [], text: ' ' }, type: Node_Type.TEXT },
    ];
    expect(filterKeys(getTextNodes(block, entityMap))).toEqual(expectedResult);
  });

  it('should convert block data', () => {
    const blockData = {
      config: {
        alignment: 'center',
        size: 'content',
        showTitle: true,
        showDescription: true,
        disableExpand: false,
      },
      src: {
        id: '036c6bf6cef5e4409848eb4eb6f80de1',
        original_file_name: '8bb438_131a7e1872bc45ec827bb61e56b840fe.jpg',
        file_name: '8bb438_131a7e1872bc45ec827bb61e56b840fe.jpg',
        width: 2898,
        height: 3354,
      },
      metadata: {
        caption: 'The caption!',
        alt: 'feet',
      },
    };

    const expectedNodeData = {
      containerData: { width: { size: 'CONTENT' }, alignment: 'CENTER' },
      image: {
        src: { custom: '8bb438_131a7e1872bc45ec827bb61e56b840fe.jpg' },
        width: 2898,
        height: 3354,
      },
      disableExpand: false,
      altText: 'feet',
      caption: 'The caption!',
    };

    const nodeData = convertBlockDataToRicos(IMAGE_TYPE, blockData);

    expect(nodeData).toEqual(expectedNodeData);
  });
});
