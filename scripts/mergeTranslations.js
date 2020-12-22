const fs = require('fs');
const path = require('path');

const mergedTranslations = {};
const getPath = package => `../packages/${package}/web/statics`;
const editorTranslationsPath = `${getPath('editor-common')}/locale/`;
const viewerTranslationsPath = `${getPath('common')}/viewer/locale/`;
const allTranslationsPath = `${getPath('common')}/locale/`;

[editorTranslationsPath, viewerTranslationsPath].forEach(transPath => {
  fs.readdirSync(path.join(__dirname, transPath), `utf8`).forEach(file => {
    const trans = fs.readFileSync(path.join(__dirname, transPath + file), `utf8`);
    mergedTranslations[file] = { ...mergedTranslations[file], ...JSON.parse(trans) };
  });
});

Object.keys(mergedTranslations).forEach(file => {
  fs.writeFileSync(
    path.join(__dirname, allTranslationsPath + file),
    JSON.stringify(mergedTranslations[file], null, '\t'),
    `utf8`
  );
});
