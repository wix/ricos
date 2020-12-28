import { MigrateSchema } from '.';

import fixture from '../../../../../e2e/tests/fixtures/intro.json';
import ricosFixture from './fixtures/intro.ricos.json';
describe('migrate from draft', () => {
  it('should migrate intro fixture', () => {
    expect(MigrateSchema.fromDraft(fixture)).toEqual(ricosFixture);
  });
});
