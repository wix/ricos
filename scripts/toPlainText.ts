/* eslint-disable no-console */
import path from 'path';
import { fromDraft } from 'ricos-content/libs/migrateSchema';
import { toPlainText } from 'ricos-content/libs/toPlainText';
const FIXTURES_PATH = '../e2e/tests/fixtures';

const filename = process.argv[2];

if (filename) {
  const originalFixture = require(path.resolve(
    __dirname,
    `${FIXTURES_PATH}/${filename.replace('.json', '')}.json`
  ));
  const ricosFixture = fromDraft(originalFixture);
  toPlainText(ricosFixture).then(plainText => console.log(plainText));
}
