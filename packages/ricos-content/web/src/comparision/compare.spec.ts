import { compare as compareDraftContent } from './compare';
import content from '../../../../../e2e/tests/fixtures/migration-content.json';
import { DraftContent } from '../types/contentTypes';
import { Lens } from 'monocle-ts';

describe('comapare DraftContent', () => {
  it('should report equality of the same valid content', () => {
    expect(compareDraftContent(content, content)).toStrictEqual({});
  });

  [
    ['entityMap', '5', 'data', 'config', 'link'],
    ['entityMap', '4', 'data', 'anchor'],
  ].forEach(p => {
    it(`should not crash comparing null prop ${p.join('.')}`, () => {
      const contentWithNull = getContentWithNullProp(p, content);
      expect(compareDraftContent(contentWithNull, contentWithNull)).toStrictEqual({});
    });
  });
});

function getContentWithNullProp(path, content) {
  const lens = Lens.fromPath<DraftContent>()(path);
  const resetProp = lens.set(null as never);
  return resetProp(content);
}
