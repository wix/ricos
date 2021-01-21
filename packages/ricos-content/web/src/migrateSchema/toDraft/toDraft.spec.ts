import { toDraft, fromDraft } from '..';
import { compare } from '../../comparision/compare';
import fixture from '../../../../../../e2e/tests/fixtures/intro.json';
import complexFixture from '../../../../../../e2e/tests/fixtures/migration-content.json';
import anchorBlocksFixture from '../../../../../../e2e/tests/fixtures/all-blocks-with-anchors.json';
import { ANCHOR_TYPE } from '../..';

const fixtures = { intro: fixture, complex: complexFixture };

describe('migrate to draft', () => {
  Object.entries(fixtures).forEach(([name, content]) =>
    it(`should migrate ${name} fixture`, () => {
      expect(compareWithConverted(content)).toEqual({});
    })
  );

  it('should migrate anchors', () => {
    const content = convert(anchorBlocksFixture);
    const anchorKeys = Object.values(content.entityMap)
      .filter(({ type }) => type === ANCHOR_TYPE)
      .map(({ data }) => data.anchor);
    const blockKeys = content.blocks.map(({ key }) => key);
    const anchorsWithoutBlock = anchorKeys.filter(anchor => !blockKeys.includes(anchor));
    expect(anchorsWithoutBlock.length).toEqual(0);
  });
});

const convert = content => toDraft(fromDraft(content));
const compareWithConverted = content => compare(convert(content), content);
