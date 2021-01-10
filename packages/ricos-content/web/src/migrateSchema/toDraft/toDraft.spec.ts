import { toDraft, fromDraft } from '..';
import { compare } from '../../comparision/compare';
import fixture from '../../../../../../e2e/tests/fixtures/intro.json';
import complexFixture from '../../../../../../e2e/tests/fixtures/migration-content.json';
import ricosFixture from './reverseMigratedFixtures/intro.json';
import complexRicosFixture from './reverseMigratedFixtures/migration-content.json';
import { RicosContent as RicosContentDraft } from '../..';

describe('migrate to draft', () => {
  it('should migrate intro fixture', () => {
    expect(compare(toDraft(fromDraft(fixture)), ricosFixture as RicosContentDraft)).toEqual({});
  });

  it('should migrate complex fixture', () => {
    expect(
      compare(toDraft(fromDraft(complexFixture)), complexRicosFixture as RicosContentDraft)
    ).toEqual({});
  });
});
