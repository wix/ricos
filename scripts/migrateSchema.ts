/* eslint-disable no-console */
import { writeFileSync, existsSync } from 'fs';
import path from 'path';
import { fromDraft, toDraft } from 'ricos-content/libs/migrateSchema';
import { RicosContent } from 'ricos-schema';
import { RicosContent as RicosDraftContent } from 'wix-rich-content-common';
import { compare } from 'ricos-content/libs/comparision';
import { cloneDeep } from 'lodash';
const FIXTURES_PATH = '../e2e/tests/fixtures';
const MIGRATED_FIXTURES_PATH =
  '../packages/ricos-content/web/src/migrateSchema/fromDraft/migratedFixtures';
const REVERSE_MIGRATED_FIXTURES_PATH =
  '../packages/ricos-content/web/src/migrateSchema/toDraft/reverseMigratedFixtures';

const filename = process.argv[2];

const convertDraftFile = (filename: string): RicosContent => {
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

const convertRicosFile = (filename: string): RicosDraftContent => {
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
  const originalFixture = cloneDeep(
    require(path.resolve(__dirname, `${FIXTURES_PATH}/${filename.replace('.json', '')}.json`))
  );
  const ricosSchema = convertDraftFile(filename);
  writeFileSync(`${MIGRATED_FIXTURES_PATH}/${filename}.json`, JSON.stringify(ricosSchema, null, 2));
  const draftData = convertRicosFile(filename);
  writeFileSync(
    `${REVERSE_MIGRATED_FIXTURES_PATH}/${filename}.json`,
    JSON.stringify(draftData, null, 2)
  );
  const diff = compare(draftData, originalFixture);
  if (Object.keys(diff).length > 0) {
    console.log('\n*** Reverse migration found differences! ***');
  }
}
