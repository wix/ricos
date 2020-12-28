import { MigrateSchema } from '.';
import { compare } from '../comparision/compare';

import fixture from '../../../../../e2e/tests/fixtures/intro.json';

const ricosFixture = require('./migratedFixtures/intro.json');
describe('migrate from draft', () => {
  it('should migrate intro fixture', () => {
    expect(compare(MigrateSchema.fromDraft(fixture), ricosFixture)).toEqual({});
  });

  // it('getTextNodes', () => {
  //   exppect(getTextNodes()).toBe('blah');
  // });
});
