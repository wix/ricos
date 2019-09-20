import { omit } from 'lodash';
import UUT from './ContentStateBuilder';
import { contentState as expected } from '../tests/contentState';

const butKey = obj => omit(obj, 'key');
/* eslint-disable max-len*/
describe('content state text builder', () => {
  it('should add a single plain text block', () => {
    const contentState = new UUT().plain('the first block plain text').get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[0]));
  });

  it('should add multiple plain text blocks from array', () => {
    const contentState = new UUT().plain(['the first block plain text', '']).get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[0]));
    expect(butKey(contentState.blocks[1])).toEqual(butKey(expected.blocks[1]));
  });

  it('should add multiple plain text blocks by chaining', () => {
    const contentState = new UUT()
      .plain('the first block plain text')
      .plain('')
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

    const contentState = new UUT().plain('plain text with inline styles', config).get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[5]));
  });

  it('should add an ordered list to the content', () => {
    const contentState = new UUT()
      .ol(['ordered list item 1', 'ordered list item 2', 'ordered list item 3'])
      .get();

    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[17]));
    expect(butKey(contentState.blocks[1])).toEqual(butKey(expected.blocks[18]));
    expect(butKey(contentState.blocks[2])).toEqual(butKey(expected.blocks[19]));
  });

  it('should add an unordered list to the content', () => {
    const contentState = new UUT()
      .ul(['unordered list item 1', 'unordered list item 2', 'unordered list item 3'])
      .get();

    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[23]));
    expect(butKey(contentState.blocks[1])).toEqual(butKey(expected.blocks[24]));
    expect(butKey(contentState.blocks[2])).toEqual(butKey(expected.blocks[25]));
  });

  it('should add a code block to the content', () => {
    const contentState = new UUT().code(['const codeBlock = this;']).get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[34]));
  });

  it('should add a quote to the content', () => {
    const quote =
      'Listen, Jerry, I don’t want to overstep my bounds or  anything. It’s your house. It’s your world. You’re a real Julius Caesar,  but I’ll tell you some, tell you how-how I feel about school, Jerry.  It’s a waste of time, a bunch of people running around, bumping into  each other. G-guy up front says, “two plus two.” The people in the back  say, “four.” Then the bell rings, and they give you a carton of milk and  a piece of paper that says you can take a dump or something. I mean,  it’s—it’s not a place for smart people, Jerry, and I know that’s not a  popular opinion, but it’s my two cents on the issue.';
    const contentState = new UUT().quote(quote).get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[35]));
  });

  it('should add headings to the content', () => {
    Object.entries({
      h2: 'heading2',
      h3: 'heading3',
      h4: 'heading4',
      h5: 'heading5',
      h6: 'heading6',
    }).forEach(([method, text], idx) => {
      const contentState = new UUT()[method](text).get();
      expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[36 + idx]));
    });
  });
});

// describe('content state media builder', () => {
//   it('should add an image to the content', () => {
//     const contentState = new UUT()
//       .image({
//         url: '',
//         width: '',
//         height: '',
//       })
//       .get();
//     expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[3]));
//     expect(contentState.entityMap[0]).toEqual(expected.entityMap[0]);
//   });
// });
/*eslint-enable max-len*/
