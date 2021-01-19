const fs = require('fs');
const path = require('path');

const mergedTranslations = {};
const getPath = package => `../packages/${package}/web`;
const editorTranslationsPath = `${getPath('editor-common')}/statics/locale/`;
const viewerTranslationsPath = `${getPath('common')}/statics/viewer/locale/`;
const allTranslationsPath = `${getPath('common')}/dist/statics/locale/`;

[editorTranslationsPath, viewerTranslationsPath].forEach(transPath => {
  fs.readdirSync(path.join(__dirname, transPath), `utf8`).forEach(file => {
    const trans = fs.readFileSync(path.join(__dirname, transPath + file), `utf8`);
    mergedTranslations[file] = { ...mergedTranslations[file], ...JSON.parse(trans) };
  });
});

Object.keys(mergedTranslations).forEach(file => {
  const filePath = path.join(__dirname, allTranslationsPath);
  fs.mkdirSync(filePath, { recursive: true });
  fs.writeFileSync(filePath + file, JSON.stringify(mergedTranslations[file], null, '\t'), `utf8`);
});
