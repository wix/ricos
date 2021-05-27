import { getContentLength } from './getContentLength';
import { RichContent } from 'ricos-schema';
import draftContent from '../../../../e2e/tests/fixtures/text-blocks.json';
import richContent from '../../../../e2e/tests/fixtures/text-blocks-new.json';

describe('getContentLength (Draft)', () => {
  it('should return correct content length', () => {
    const length = getContentLength(draftContent);
    expect(length).toEqual(579);
  });
});

describe('getContentLength (RichContent)', () => {
  it('should return correct content length', () => {
    const length = getContentLength(RichContent.fromJSON(richContent));
    expect(length).toEqual(579);
  });
});
