import { getContentLength } from './getContentLength';
import draftContent from '../../../../e2e/tests/fixtures/text-blocks.json';
import richContent from '../../../../e2e/tests/fixtures/text-blocks-new.json';

describe('getContentLength (Draft)', () => {
  it('should return correct content length', () => {
    const length = getContentLength(draftContent);
    expect(length).toEqual(586);
  });
});
describe('getContentLength (RichContent)', () => {
  it('should return correct content length', () => {
    const length = getContentLength(richContent);
    expect(length).toEqual(586);
  });
});
