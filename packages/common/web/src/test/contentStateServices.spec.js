/* eslint-disable max-len */
import plain from '../../../../../e2e/tests/fixtures/plain.json';
import { truncateContentState } from '../lib/contentStateServices';
const plainTop2Blocks = {
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
      key: '4qd6h',
      text:
        'Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

describe('Test content state services functions', () => {
  it('should check truncateContentState', () => {
    const newContentState = truncateContentState(plain, 2);
    expect(newContentState).toEqual(plainTop2Blocks);
  });
});
