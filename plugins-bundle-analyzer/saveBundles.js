const { analyze } = require('./analyzeBundles');
const fs = require('fs');

async function saveBundles() {
  const fileName = process.env.FILE_NAME;
  const data = await analyze();
  fs.writeFile(`${fileName}.json`, JSON.stringify(data, null, 2), err => {
    if (err) throw err;
  });
}
saveBundles();
