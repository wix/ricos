/* eslint-disable no-console */
import { readdirSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { MigrateSchema } from 'ricos-content/libs/migrateSchema';
import { RicosContent } from 'ricos-schema';
import { transform, isEqual, isObject } from 'lodash';

const FIXTURES_PATH = '../e2e/tests/fixtures';
const MIGRATED_FIXTURES_PATH = '../packages/ricos-content/web/src/migrateSchema/migratedFixtures';
const FIXTURES_TO_IGNORE = ['old-image-format'];

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
        const diff = difference(ricosSchema, prevMigratedFixture);
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

/**
 * Deep diff between two object, using lodash
 * @param  {RicosContent} object Object compared
 * @param  {RicosContent} base   Object to compare with
 * @return {RicosContent}        Return a new object who represent the diff
 */
function difference(object: RicosContent, base: RicosContent): RicosContent {
  function changes(object: RicosContent, base: RicosContent) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return transform<any, RicosContent>(object, (result, value, key) => {
      const baseValue = base[key];
      if (!isEqual(value, baseValue) && !['anchorNode', 'lastEdited', 'key'].includes(key)) {
        const areObjects = isObject(value) && isObject(baseValue);
        const currentValue = areObjects ? changes(value, baseValue) : value;
        if (!(isObject(currentValue) && Object.keys(currentValue).length === 0)) {
          result[key] = currentValue;
          if (!areObjects) {
            console.dir(
              {
                [key]: {
                  from: baseValue,
                  to: currentValue,
                },
              },
              { depth: null }
            );
          }
        }
      }
    });
  }
  return changes(object, base);
}
