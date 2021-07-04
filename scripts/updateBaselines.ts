/* eslint-disable no-console */
import path from 'path';
import chalk from 'chalk';
import { writeFileSync } from 'fs';
import { fromDraft } from '../packages/ricos-content/web/src/converters/draft';
import { fromPlainText, toPlainText } from '../packages/ricos-content/web/src/converters/plainText';
import { toHtml } from '../packages/ricos-content/web/src/converters/html';
import { toTiptap } from '../packages/ricos-content/web/src/converters/tiptap';
import migrationContent from '../e2e/tests/fixtures/migration-content.json';
import { RichContent } from 'ricos-schema';

const getAbsPath = (relPath: string) => path.resolve(__dirname, relPath);

const RICH_CONTENT_BASELINE = getAbsPath(
  '../packages/ricos-content/web/statics/json/migratedFixtures/migration-content.json'
);
const TO_PLAIN_TEXT_BASELINE = getAbsPath(
  '../packages/ricos-content/web/src/converters/plainText/toPlainText/complexPlainText.ts'
);
const FROM_PLAIN_TEXT_BASELINE = getAbsPath(
  '../packages/ricos-content/web/src/converters/plainText/fromPlainText/plainTextContent.json'
);
const HTML_BASELINE = getAbsPath(
  '../packages/ricos-content/web/src/converters/html/toHtml/__tests__/complexContentHtml.html'
);
const TIPTAP_BASELINE = getAbsPath(
  '../packages/ricos-content/web/src/converters/tiptap/toTiptap/__tests__/migrationContentTiptap.json'
);

enum Target {
  RICOS = 'ricos',
  TEXT = 'text',
  HTML = 'html',
  TIPTAP = 'tiptap',
}

const convertToRichContent = async () => {
  console.log('Converting to ' + chalk.green('rich content') + '...');
  const richContentJSON = RichContent.toJSON(richContent);
  writeFileSync(RICH_CONTENT_BASELINE, JSON.stringify(richContentJSON, null, 2));
  console.log('Saved rich content baseline 💰\n');
};

const convertToHtml = async () => {
  console.log('Converting to ' + chalk.green('HTML') + '...');
  const html = toHtml(richContent);
  writeFileSync(HTML_BASELINE, html);
  console.log('Saved HTML baseline 🌎\n');
};

const convertPlainText = async () => {
  console.log('Converting to/from ' + chalk.green('plain text') + '...');
  await convertToPlainText();
  convertFromPlainText();
  console.log('Saved to/from plain text baselines 📃\n');
};

const convertToPlainText = async () => {
  const plainTextBaseline = (text: string) =>
    '/* eslint-disable max-len */\nexport const PLAIN_TEXT = `' + text + '`;\n';

  const plainText = await toPlainText(richContent);
  writeFileSync(TO_PLAIN_TEXT_BASELINE, plainTextBaseline(plainText));
};

const convertFromPlainText = () => {
  const { PLAIN_TEXT } = require(TO_PLAIN_TEXT_BASELINE);
  const content = fromPlainText(PLAIN_TEXT);
  const contentJSON = RichContent.toJSON(content);
  writeFileSync(FROM_PLAIN_TEXT_BASELINE, JSON.stringify(contentJSON, null, 2));
};

const convertToTiptap = async () => {
  console.log('Converting to ' + chalk.green('tiptap') + '...');
  const tiptap = toTiptap(richContent);
  writeFileSync(TIPTAP_BASELINE, JSON.stringify(tiptap, null, 2));
  console.log('Saved tiptap baseline ⚪️\n');
};

const target = process.argv[2]?.toLowerCase();
const richContent = fromDraft(migrationContent);

const conversions: Promise<void>[] = [];
switch (target) {
  case Target.RICOS:
    conversions.push(convertToRichContent());
    break;
  case Target.HTML:
    conversions.push(convertToHtml());
    break;
  case Target.TIPTAP:
    conversions.push(convertToTiptap());
    break;
  case Target.TEXT:
    conversions.push(convertPlainText());
    break;
  case undefined:
    conversions.push(
      convertToRichContent(),
      convertToHtml(),
      convertToTiptap(),
      convertPlainText()
    );
    break;
  default:
    console.error(chalk.red(`Target "${target}" should be one of ${Object.values(Target)}`));
}

if (conversions.length > 0) {
  Promise.all(conversions).then(() => {
    console.warn(
      chalk.yellow('Please make sure all changes to baselines are required before comitting\n')
    );
  });
}
