/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { MigrateSchema } from 'ricos-content/libs/migrateSchema';
import { RicosContent, verify } from 'ricos-schema';

const FIXTURES_PATH = '../e2e/tests/fixtures';
const MIGRATED_FIXTURES_PATH = '../packages/ricos-content/web/src/migrateSchema/migratedFixtures';

const filename = process.argv[2];

const convertFile = (filename: string): RicosContent => {
  const filepath = path.resolve(
    __dirname,
    `${FIXTURES_PATH}/${filename.replace('.json', '')}.json`
  );
  if (!fs.existsSync(filepath)) {
    console.log(`${filepath} does not exist!`);
    process.exit();
  }

  const draftData = require(filepath);
  const ricosSchema = MigrateSchema.fromDraft(draftData);
  const err = verify(ricosSchema);
  if (err) {
    console.error(filename);
    console.error(err + '\n');
  }
  return ricosSchema;
};

if (filename) {
  const ricosSchema = convertFile(filename);
  console.log(JSON.stringify(ricosSchema, null, 2));
} else {
  const fixtures = fs.readdirSync(FIXTURES_PATH);
  fixtures.forEach(fixture => {
    if (fixture.endsWith('.json')) {
      const ricosSchema = convertFile(fixture);
      fs.writeFileSync(
        `${MIGRATED_FIXTURES_PATH}/${fixture}`,
        JSON.stringify(ricosSchema, null, 2)
      );
    }
  });
}
