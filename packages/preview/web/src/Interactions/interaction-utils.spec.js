import { readMore as uut } from './interaction-utils.js';
import ContentStateBuilder from '../ContentStateBuilder/ContentStateBuilder';
import { butKey } from '../tests/test-utils';

describe('read more interaction', () => {
  it('should merge interaction settings with the last block data', () => {
    const builder = new ContentStateBuilder().plain('some text');
    const interacted = uut(builder, { lines: 5 });
    const expectedBlock = {
      type: 'unstyled',
      text: 'some text',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {
        interactions: [
          {
            type: 'READ_MORE',
            settings: { lines: 5 },
          },
        ],
      },
    };

    const actualBlock = interacted.contentState.blocks[0];
    expect(butKey(actualBlock)).toEqual(expectedBlock);
  });

  it('should ignore atomic blocks', () => {
    const builder = new ContentStateBuilder().image({
      mediaInfo: {
        url: '',
        width: 1200,
        height: 1200,
      },
    });
    const expectedBlock = {
      type: 'atomic',
      text: ' ',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [{ key: 0, length: 1, offset: 0 }],
      data: {},
    };
    const interacted = uut(builder, { label: 'test', lines: 6, ellipsis: '...' });
    const actualBlock = interacted.contentState.blocks[0];

    expect(butKey(actualBlock)).toEqual(expectedBlock);
  });

  it('should bypass an empty state builder', () => {});
});
