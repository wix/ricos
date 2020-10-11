import { isContentStateEmpty } from './contentStateUtils';
import { createContent } from './createContent';
import NonEmptyContentState from '../normalization/Fixtures/AnchorInImageContentState';
describe('Content State Utils', () => {
  describe('Is Empty', () => {
    it('should return true for empty state', () => {
      expect(isContentStateEmpty(createContent(''))).toBe(true);
    });
    it('should return false for non-empty state', () => {
      expect(isContentStateEmpty(createContent('non empty!!'))).toBe(false);
    });

    it('should return false for non-empty state', () => {
      expect(isContentStateEmpty(createContent('non empty!!'))).toBe(false);
    });

    it('should return false for non-empty state (multi blocks)', () => {
      expect(isContentStateEmpty(NonEmptyContentState)).toBe(false);
    });
  });
});
