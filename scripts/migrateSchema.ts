/* eslint-disable no-console */
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fromDraft, toDraft } from 'ricos-content/libs/migrateSchema';
import { RichContent } from 'ricos-schema';
import { DraftContent } from 'ricos-content';
import { compare } from 'ricos-content/libs/comparision';
const FIXTURES_PATH = '../e2e/tests/fixtures';
const MIGRATED_FIXTURES_PATH = '../packages/ricos-content/web/statics/json/migratedFixtures';
const REVERSE_MIGRATED_FIXTURES_PATH =
  '../packages/ricos-content/web/src/converters/draft/toDraft/reverseMigratedFixtures';

const filename = process.argv[2];

const convertDraftFile = (filename: string): RichContent => {
  const filepath = path.resolve(
    __dirname,
    `${FIXTURES_PATH}/${filename.replace('.json', '')}.json`
  );
  if (!existsSync(filepath)) {
    console.log(`${filepath} does not exist!`);
    process.exit();
  }

  const draftData = require(filepath);
  const ricosSchema = fromDraft(draftData);
  return ricosSchema;
};

const convertRicosFile = (filename: string): DraftContent => {
  const filepath = path.resolve(
    __dirname,
    `${MIGRATED_FIXTURES_PATH}/${filename.replace('.json', '')}.json`
  );
  if (!existsSync(filepath)) {
    console.log(`${filepath} does not exist!`);
    process.exit();
  }

  const ricosSchema = require(filepath);
  const draftData = toDraft(ricosSchema);
  return draftData;
};

if (filename) {
  const originalFixture = require(path.resolve(
    __dirname,
    `${FIXTURES_PATH}/${filename.replace('.json', '')}.json`
  ));
  const ricosSchema = convertDraftFile(filename);
  writeFileSync(`${MIGRATED_FIXTURES_PATH}/${filename}.json`, JSON.stringify(ricosSchema, null, 2));
  const draftData = convertRicosFile(filename);
  if (!existsSync(REVERSE_MIGRATED_FIXTURES_PATH)) {
    mkdirSync(REVERSE_MIGRATED_FIXTURES_PATH);
  }
  writeFileSync(
    `${REVERSE_MIGRATED_FIXTURES_PATH}/${filename}.json`,
    JSON.stringify(draftData, null, 2)
  );
  const diff = compare(draftData, originalFixture, { verbose: true });
  if (Object.keys(diff).length > 0) {
    console.log('\n*** Reverse migration found differences! ***');
  }
}
