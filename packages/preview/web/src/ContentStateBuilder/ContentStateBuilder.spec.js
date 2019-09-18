import { omit } from 'lodash';
import UUT from './ContentStateBuilder';
import { contentState as expected } from '../tests/contentState';

const butKey = obj => omit(obj, 'key');

describe('content state text builder', () => {
  it('should add a single plain text block', () => {
    const contentState = new UUT().text('the first block plain text').get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[0]));
  });

  it('should add multiple plain text blocks from array', () => {
    const contentState = new UUT().text(['the first block plain text', '']).get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[0]));
    expect(butKey(contentState.blocks[1])).toEqual(butKey(expected.blocks[1]));
  });

  it('should add multiple plain text blocks by chaining', () => {
    const contentState = new UUT()
      .text('the first block plain text')
      .text('')
      .get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[0]));
    expect(butKey(contentState.blocks[1])).toEqual(butKey(expected.blocks[1]));
  });

  it('should correctly merge custom block config with the default one', () => {
    const config = {
      inlineStyleRanges: [
        {
          offset: 0,
          length: 5,
          style: 'BOLD',
        },
        {
          offset: 6,
          length: 4,
          style: 'ITALIC',
        },
        {
          offset: 11,
          length: 4,
          style: 'UNDERLINE',
        },
        {
          offset: 16,
          length: 6,
          style: 'color4',
        },
      ],
    };

    const contentState = new UUT().text('plain text with inline styles', config).get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[5]));
  });
});
