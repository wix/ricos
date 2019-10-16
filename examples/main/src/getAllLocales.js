//must be run in node using 'preval'

const fs = require('fs');
const path = require('path');

const localeDir = path.resolve(__dirname, '../../../packages/editor/web/statics/locale');
const locales = [];
const files = fs.readdirSync(localeDir);

for (const file of files) {
  if (file.indexOf('messages_') > -1 && file.indexOf('.json') > -1) {
    locales.push(file.substr(file.indexOf('_') + 1, 2));
  }
}

module.exports = locales;
