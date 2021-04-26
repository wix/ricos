import errorBlocksRemover from './errorBlocksRemover';
import { processedErrorBlocksContentState, errorBlocksContentState } from './fixtures';

describe('error blocks removals', () => {
  it('should remove all blocks with errors', () => {
    expect(errorBlocksRemover(errorBlocksContentState)).toEqual(processedErrorBlocksContentState);
  });
});
