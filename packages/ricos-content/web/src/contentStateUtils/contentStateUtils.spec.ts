import { isContentStateEmpty } from './contentStateUtils';
import { createContent } from './createContent';

describe('Content State Utils', () => {
  describe('Is Empty', () => {
    it('should return true for empty state', () => {
      expect(isContentStateEmpty(createContent(''))).toBe(true);
    });
    it('should return false for non-empty state', () => {
      expect(isContentStateEmpty(createContent('non empty!!'))).toBe(false);
    });
  });
});
