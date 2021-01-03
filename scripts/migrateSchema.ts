/* eslint-disable no-console */
import { readdirSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { MigrateSchema } from 'ricos-content/libs/migrateSchema';
import { RicosContent } from 'ricos-schema';
import { compare } from 'ricos-content/libs/comparision';
const FIXTURES_PATH = '../e2e/tests/fixtures';
const MIGRATED_FIXTURES_PATH = '../packages/ricos-content/web/src/migrateSchema/migratedFixtures';
const FIXTURES_TO_IGNORE = ['old-image-format', 'long-post-bad-data'];

const filename = process.argv[2];

const convertFile = (filename: string): RicosContent => {
  const filepath = path.resolve(
    __dirname,
    `${FIXTURES_PATH}/${filename.replace('.json', '')}.json`
  );
  if (!existsSync(filepath)) {
    console.log(`${filepath} does not exist!`);
    process.exit();
  }

  const draftData = require(filepath);
  const ricosSchema = MigrateSchema.fromDraft(draftData);
  return ricosSchema;
};

if (filename) {
  const ricosSchema = convertFile(filename);
  console.log(JSON.stringify(ricosSchema, null, 2));
} else {
  let hasDifferences = false;
  const fixtures = readdirSync(FIXTURES_PATH).filter(
    fixture => !FIXTURES_TO_IGNORE.includes(fixture.split('.')[0])
  );
  fixtures.forEach(fixture => {
    if (fixture.endsWith('.json')) {
      console.log('Migrating ', fixture);
      const ricosSchema = convertFile(fixture);
      if (existsSync(`${MIGRATED_FIXTURES_PATH}/${fixture}`)) {
        const prevMigratedFixture = require(`${MIGRATED_FIXTURES_PATH}/${fixture}`);
        const diff = compare(ricosSchema, prevMigratedFixture);
        if (Object.keys(diff).length > 0) {
          hasDifferences = true;
        }
      }

      writeFileSync(`${MIGRATED_FIXTURES_PATH}/${fixture}`, JSON.stringify(ricosSchema, null, 2));
    }
  });
  if (hasDifferences) {
    console.log('\n*** Differences found! ***');
  }
}
