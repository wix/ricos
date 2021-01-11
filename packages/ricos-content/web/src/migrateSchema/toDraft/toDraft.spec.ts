import { toDraft, fromDraft } from '..';
import { compare } from '../../comparision/compare';
import fixture from '../../../../../../e2e/tests/fixtures/intro.json';
import complexFixture from '../../../../../../e2e/tests/fixtures/migration-content.json';
import anchorBlocksFixture from '../../../../../../e2e/tests/fixtures/all-blocks-with-anchors.json';
import { cloneDeep } from 'lodash';

const fixtures = { intro: fixture, complex: complexFixture, anchors: anchorBlocksFixture };

describe('migrate to draft', () => {
  Object.entries(fixtures).forEach(([name, content]) =>
    it(`should migrate ${name} fixture`, () => {
      expect(compareWithReversed(content)).toEqual({});
    })
  );
});

const compareWithReversed = content => compare(toDraft(fromDraft(cloneDeep(content))), content);
