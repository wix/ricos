/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { MigrateSchema } = require('../packages/ricos-content/web/dist/lib/migrateSchema.cjs');

const filename = process.argv[2];
if (!filename) {
  console.log('Usage: npm start -- {draft-schema-filename}');
  process.exit();
}

const filepath = path.resolve(__dirname, `../e2e/tests/fixtures/${filename}.json`);
if (!fs.existsSync(filepath)) {
  console.log(`${filepath} does not exist!`);
  process.exit();
}

const draftData = require(filepath);
const wixSchema = MigrateSchema.fromDraft(draftData);
console.log(JSON.stringify(wixSchema, null, 2));
